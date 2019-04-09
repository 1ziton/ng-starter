import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YztACLModule } from '@core/acl';
import { CopyDomDirective } from '@shared/directives/copy-dom.directive';
import { StopPropagationDirective } from '@shared/directives/stopPropagation.directive';
import { GlobalObservable } from '@shared/services/global-observable';
import { ValidatorModule } from '@shared/validator/validator.module';
import { ZorroExtModule } from '@zorro-ext/lib/yzt-custom.module';
// lib:third part
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QueryConditionListComponent, EnumFieldsFilterPipe } from './component/query-condition-list/query-condition-list.component';
// directives
import { SetPageHeightDirective } from './directives/set-page-height.directive';
import { AreaMultipleSelectCom } from './component/area-multiple/area-multiple.component';
import { CallbackPipe } from './pipes/callback.pipe';



// region: your componets & directives
const COMPONENTS = [
    QueryConditionListComponent,
    AreaMultipleSelectCom
];

const DIRECTIVES = [
    SetPageHeightDirective,
    StopPropagationDirective,
    CopyDomDirective,
    CallbackPipe,
    EnumFieldsFilterPipe,
];

const MODULES = [
    YztACLModule
]
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        ValidatorModule,
        ZorroExtModule,
        ...MODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgZorroAntdModule,
        ZorroExtModule,
        ValidatorModule,
        ...MODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    providers: [
        GlobalObservable
    ]
})
export class SharedModule { }
