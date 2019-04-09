import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { LayoutDefaultComponent } from './layout/default/default.component';
import { Exception404Component } from 'app/security/exception/404.component';




const routes: Routes = [
  // { path: '', component: HomeComponent ,canActivate: [ACLGuard]},
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      // NO Guard Router
      { path: '', pathMatch: 'full', redirectTo: 'demo' },
      { path: 'access_token', pathMatch: 'prefix', redirectTo: 'test' },
      { path: 'demo', loadChildren: 'app/pages/demo/demo.module#DemoModule' },
      { path: 'user-center', loadChildren: 'app/pages/user-center/user-center.module#UserCenterModule' },
      { path: 'test', component: Exception404Component },
      // { path: 'order-payment/:orderNum', component: OrderPaymentComponent, data: { reuseTitle: '收银台', title: '收银台', reuse: true } },
    ],
  },
  {
    path: 'security',
    loadChildren: 'app/security/security.module#SecurityModule',
  }
];

@NgModule({
  declarations: [
    /* components */
  ],
  imports: [SharedModule, RouterModule.forRoot(routes, environment.production ? {
    useHash: true,
    preloadingStrategy: PreloadAllModules
  } : { useHash: true })],
  exports: [RouterModule],
  entryComponents: [
    /* entry components */
  ],
  providers: []
})
export class AppRoutingModule {
}
