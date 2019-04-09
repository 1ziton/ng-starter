import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { SupplierManageService } from './supplier-manage.service';
import { Subject } from 'rxjs';
class OptField {
    name: string;
    phone: string;
}
@Component({
  selector: 'app-test-tab',
  templateUrl: './test-tab.component.html',
  styleUrls: ['./test-tab.component.less']
})
export class TestTabComponent implements OnInit {

    gridHeader = [
        '供应商名称-name---true-true',
        '手机号-phone',
        '联系人-contacts',
        '详细地址-mergerName-200px',
        '备注-remark-200px',
        '操作-operate--true-true',
    ];
    valueObj = {};
    labelObj = {
        name: '供应商名称',
        phone: '手机号',
    };
    data;
    fullName: string;
    columns = [];
    selections = [];
    searchStream$ = new Subject<any>();
    searchField = new OptField();
    curPage: any;
    constructor(private dialog: NzModalService, private _service: SupplierManageService, private _msg: NzMessageService) {
        this.searchStream$.debounceTime(250)
            .subscribe(_ => {
                this.onConfirm();
                this.loadData();
            })
    }

    ngOnInit() {
        this.initGrid();
    }
    closeSearch($event) {
        this.searchField[$event] = null;
        this.loadData(this.curPage);
    }
    initGrid() {
        for (let item of this.gridHeader) {
            let arr = item.split('-');
            this.columns.push({
                header: arr[0],
                field: arr[1],
                width: arr[2],
                frozenRight: arr[3],
                search: arr[4],
                frozenLeft: arr[5]
            })
        }
    }

    loadData(event = { page: 1, size: 10 }) {
        this.curPage  = event;
        let param = { ...event, ...this.searchField };
        this._service.pageSupplier(param).subscribe(
            response => {
                this.data = response;
            }
        )
    }
    showAddModel(type, e?, id?) {
        // let params;
        // if (type) {
        //     params = {
        //         nzTitle: "新增供应商",
        //         nzContent: AddSupplierComponent,
        //         nzClassName: 'can-scroll',
        //         nzWidth: 540,
        //         nzFooter: null,
        //     };
        // } else {
        //     let rowData = this.data.data.filter(val => val.id === id)
        //     e.stopPropagation();
        //     params = {
        //         nzTitle: "修改供应商",
        //         nzContent: AddSupplierComponent,
        //         nzClassName: 'can-scroll',
        //         nzWidth: 540,
        //         nzFooter: null,
        //         nzComponentParams: {
        //             modify: true,
        //             rowData: rowData[0],
        //         }
        //     };
        // }
        // this.dialog.create(params).afterClose.subscribe(res => {
        //     if (res) {
        //         this.loadData(this.curPage);
        //     }
        // });
    }
    //  删除操作
    handleDelete(e, id): void {
        e.stopPropagation();
        this.dialog.create({
            nzTitle: '提示',
            nzContent: '确认删除此条数据吗?',
            nzOnOk: () => {
                this._service.deleteSupplier({
                    "id": id
                }).subscribe(val => {
                    this._msg.success(val.desc);
                    this.loadData(this.curPage);
                })
            }
        })
    }
    /* tab刷新 */
    _onReuseRefresh() {
        this.valueObj = {};
        this.searchField = new OptField();
        this.loadData();
    }
    onConfirm() {
        this.valueObj = _.cloneDeep(this.searchField);
    }

}
