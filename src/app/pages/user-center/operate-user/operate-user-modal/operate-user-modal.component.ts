import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { UserCenterService } from '@pages/user-center/user-center.service';

@Component({
    selector: 'app-operate-user-modal',
    templateUrl: './operate-user-modal.component.html',
    styleUrls: ['./operate-user-modal.component.less']
})
export class OperateUserModalComponent implements OnInit {

    validateForm: FormGroup;

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    getCaptcha(e: MouseEvent): void {
        e.preventDefault();
    }

    constructor(
        private fb: FormBuilder,
        private msgSrv: NzMessageService,
        private subject: NzModalRef,
        private userSrv: UserCenterService,
    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            mobile: [null, [Validators.required]],
            name: [null, [Validators.required]],
            realName: [null, [Validators.required]],
            jobTitle: [null, [Validators.required]],
            employeeNo: [null, [Validators.required]],
            nickName: [null],
            email: [null, [Validators.email]],
            directSuperiorName: [null],
            sex: [null],
            birthday: [null],
            areaName: [null],
            remark: [null],
        });
    }

    save() {
        this.submitForm();
        if (this.validateForm.status === 'INVALID') {
            return;
        }
        this.userSrv.userEdit({

        }).subscribe(json => {
            this.success(json);
        });
    }

    success(res) {
        this.msgSrv.success(res.desc);
        this.subject.destroy('success');
        this.cancel();
    }

    cancel() {
        this.subject.destroy()
    }
}
