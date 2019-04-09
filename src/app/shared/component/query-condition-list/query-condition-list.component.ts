import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { isExpectVal } from '@shared/utils/utils';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';

interface SearchListInterface {
  label: string;
  value: string;
  field: string;
}
// 用来控制枚举为全部时，不展示到查询条件
@Pipe({
  name: 'enumfilter',
  pure: false
})
export class EnumFieldsFilterPipe implements PipeTransform {
  transform(items: any[], enumFields: any[]): any {
    if (!items || !filter) {
      return items;
    }
    // kept, false will be filtered out
    return items.filter(item => !(enumFields.includes(item.field) && item.value === 'ALL'));
  }
}

@Component({
  selector: 'query-condition-list',
  templateUrl: './query-condition-list.component.html',
  styleUrls: ['./query-condition-list.component.less']
})
export class QueryConditionListComponent implements OnInit, OnChanges {
  _index: number;
  @Input() enumFields: string[] = []; // 枚举字段，all的时候不显示，清空的时候设置为ALL
  @Input() conditions: SearchListInterface[] = [];
  @Output() conditionsChange: EventEmitter<any> = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.conditions.forEach(item => {
      const isArray: boolean = Array.isArray(item.value);
      if ((isArray && !item.value.length)) {
        return;
      }
      let formated = this.formatFactory(item.value, isArray);
      item.value = formated;
    })
    this._index = this.conditions.length - 1;
  }

  trackByField(index: number, tab) {
    return tab.field;
  }


  closeTab(tab: SearchListInterface): void {
    let idx = this.conditions.indexOf(tab);
    if (idx === -1) {
      return;
    }
    if (this.enumFields.includes(this.conditions[idx]['field'])) {
      this.conditions[idx]['value'] = 'ALL';
    } else {
      this.conditions[idx]['value'] = null;
    }
    this.conditionsChange.emit(this.conditions);
    this.close.emit(tab)
  }

  formatFactory(val, isArray = false): string {
    let formated = '';
    let isDate = false;
    if (!isExpectVal(val)) {
      val = '';
    }
    if (!isArray) {
      val = String(val);
      isDate = val.search('GMT') !== -1;
      if (isDate) {
        formated = moment(val).format('YYYY-MM-DD');
        return formated;
      }
      return val;
    }
    for (let i = 0; i < val.length; i++) {
      let temp = String(val[i]);
      isDate = temp.search('GMT') !== -1;
      if (isDate) {
        formated += (i ? ' ~ ' : '') + moment(temp).format('YYYY-MM-DD');
      }
    }
    if (isDate) {
      return formated;
    }
    return String(val);
  }
}

