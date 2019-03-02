import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementRoutes } from './management.routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatButtonToggleModule
  ]/*,
  declarations: [
    UserManagementComponent,
    ToolManagementComponent,
    BoardManagementComponent
  ],
  exports:[
    UserManagementComponent,
    ToolManagementComponent,
    BoardManagementComponent
  ]*/
})

export class ManagementModule {}
