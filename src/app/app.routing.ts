import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { AuthGuard } from './layouts/authentication-layout/authentication.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      canActivateChild: [AuthGuard],
      path: '',
      loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
  }]}, {
    path: 'auth',
    component: AuthenticationLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/authentication-layout/authentication-layout.module#AuthenticationLayoutModule'
  }]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
