import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { OperateUserComponent } from './operate-user/operate-user.component';
import { UserCenterService } from './user-center.service';
import { OperateUserModalComponent } from './operate-user/operate-user-modal/operate-user-modal.component';


const routes = [
  {
    path: 'operate-user',
    component: OperateUserComponent,
    data: { resue: true, title: '运营用户' }
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),

    SharedModule,
  ],
  entryComponents: [
    OperateUserModalComponent
  ],
  declarations: [
    OperateUserComponent,
    OperateUserModalComponent
  ],
  providers: [
    UserCenterService
  ]
})
export class UserCenterModule { }
