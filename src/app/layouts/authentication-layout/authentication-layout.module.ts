import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationLayoutRoutes } from './authentication-layout.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatIconModule,
  MatFormFieldModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})

export class AuthenticationLayoutModule {}
