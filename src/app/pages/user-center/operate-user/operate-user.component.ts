import { Component, OnInit } from '@angular/core';
import { formatDate } from '@shared/utils/dateUtil';
import { seachConditionHandle } from '@shared/utils/gridUtils';
import { DEBOUNCE_TIME } from 'app/config/config';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { UserCenterService } from '../user-center.service';
import { OperateUserModalComponent } from './operate-user-modal/operate-user-modal.component';


class QueryField {
  mobile = null; // 手机号
  name = null; // 用户名称
  nickName = null; // 花名（昵称）
  employeeNo = null; // 职工工号
  jobTitle = null; // 岗位
  createTime = null; // 创建时间,开始日期格式：yyyy-mm-dd
  realName = null; // 真实姓名
  sex = 'ALL'; // 性别，全部：ALL，男：MALE，女：FEMALE
  // birthday = null; // 生日,开始日期格式：yyyy-mm-dd
  areaName = null; // 所在地
  jobStatus = 'ALL'; // 在职状态，全部：ALL，在职：INSERVICE，离职：DIMISSION
  directSuperiorName = null; // 直属上级
  email = null; // 邮箱
  remark = null; // 备注
  lastLoginDate = null; // 最后登录时间,开始日期格式：yyyy-mm-dd
  lastLoginIp = null; // 最后登录IP
  creatorName = null; // 创建人
}

@Component({
  selector: 'app-operate-user',
  templateUrl: './operate-user.component.html',
  styleUrls: ['./operate-user.component.less']
})
export class OperateUserComponent implements OnInit {
  tabs = [
    { title: '全部', value: 'ALL' },
    { title: '在职', value: 'INSERVICE' },
    { title: '离职', value: 'DIMISSION' },
  ];

  gridHeader = [
    '头像-avatarImg-100px',
    '手机号-mobile-150px',
    '用户名称-name-150px',
    '花名-nickName-150px',
    '职工工号-employeeNo-150px',
    '岗位-jobTitle-150px',
    '创建时间-createTime-150px',
    '真实姓名-realName-150px',
    '性别-sex-150px',
    '生日-birthday-150px',
    '所在地-areaName-150px',
    '在职状态-jobStatus-150px',
    '直属上级-directSuperiorName-150px',
    '邮箱-email-220px',
    '备注-remark-150px',
    '最后登录时间-lastLoginDate-150px',
    '最后登录IP-lastLoginIp-150px',
    '创建人-creatorName-150px',
    '操作-operate-220px-true',
  ];

  qryFields = new QueryField();

  // 查询条件展示 query-condition-list
  searchConditions = [];

  searchStream$ = new Subject<any>();

  data;
  curPage: any;
  columns = [];
  selections = [];

  tabSelectedIndex = 0;

  constructor(
    private userSrv: UserCenterService,
    private modalSrv: NzModalService,
    private msgSrv: NzMessageService
  ) {

    this.searchStream$.debounceTime(DEBOUNCE_TIME)
      .subscribe(_ => {
        this.onConfirm();
      })
  }

  ngOnInit() {
    this.initGrid();
  }

  initGrid() {
    for (let item of this.gridHeader) {
      let arr = item.split('-');
      this.columns.push({
        header: arr[0],
        field: arr[1],
        width: arr[2],
        frozenRight: arr[3],
        frozenLeft: arr[4]
      });
      // 查询条件展示 query-condition-list
      if (this.qryFields.hasOwnProperty(arr[1])) {
        this.searchConditions.push({
          label: arr[0],
          field: arr[1],
          value: ''
        });
      }
    }
  }

  tabToggle(jobStatus) {
    this.qryFields.jobStatus = jobStatus;
    this.onConfirm();
  }

  // 搜索条件变化更新展示 query-condition-list
  delCondition($event: { field: string, value: any }) {
    this.qryFields[$event.field] = $event.value;
    this.loadData(this.curPage);
  }

  onConfirm() {
    // 搜索条件变化更新展示 query-condition-list
    this.searchConditions = seachConditionHandle(this.searchConditions, this.qryFields);
    this.loadData()
  }

  loadData(event = { page: 1, size: 10 }) {
    this.curPage = event;
    let param = { ...event, ...this.qryFields };
    this.userSrv.qryOperUserList(param).subscribe(
      response => {
        this.data = response;
      }
    )
  }

  editHandle(id: string) {
    let title = '新增';
    // OperateUserModalComponent
    if (id) {
      title = '编辑';
    }
    this.modalSrv.create({
      nzTitle: title,
      nzContent: OperateUserModalComponent,
      nzComponentParams: {

      },
      nzBodyStyle: {
        'text-align': 'center',
        'padding': '40px 24px',
      },
      nzWidth: 700,
      nzFooter: null,
    })
  }

  /**
   * 停职，转在职，重置密码
   * @param type 类型
   * @param id ID
   * @param mobile 手机号
   */
  showModal(type: string, id: string, mobile: string) {
    let content = type === 'dimission' ? `确定停用账户： ${mobile} ？` :
      (type === 'resetpass' ? `确定把账号 ${mobile} 重置密码为：123456 ？` : `确定恢复已停用账户： ${mobile} ？`);
    let operMethodName = type === 'dimission' ? 'userToDimission' : (type === 'resetpass' ? 'userResetPassword' : 'userToDimission');
    this.modalSrv.create({
      nzTitle: '提示',
      nzContent: content,
      nzBodyStyle: {
        'text-align': 'center',
        'padding': '40px 24px',
      },
      nzWidth: 400,
      nzOnOk: () => {
        this.userSrv[operMethodName]({ id }).subscribe(json => {
          this.msgSrv.success(json.desc || '操作成功！');
        });
      }
    })
  }

  /* tab刷新 */
  _onReuseRefresh() {
    this.qryFields = new QueryField();
    this.searchConditions = seachConditionHandle(this.searchConditions, this.qryFields);
    this.loadData();
  }

  onDateOpenChange($event) {
    if ($event === false) {
      const date = this.qryFields.createTime;
      this.qryFields.createTime = [formatDate(date[0], '-'), formatDate(date[1], '-')]
    }
    // console.log(this.qryFields.createTime)
  }

  onSelect($event) {
    this.selections = $event;
  }
}
