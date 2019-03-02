import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLayoutRoutes } from './user-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatTableModule
} from '@angular/material';
import { ManagementComponent } from './management/management.component';
import { UserManagementComponent } from './management/user-management/user-management.component';
import { ToolManagementComponent } from './management/tool-management/tool-management.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(UserLayoutRoutes),
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
    MatButtonToggleModule,
    MatTableModule
  ],
  declarations: [
    DashboardComponent,
    ReportComponent,
    ManagementComponent,
    UserManagementComponent,
    ToolManagementComponent
  ],
  exports:[
    DashboardComponent,
    ReportComponent,
    ManagementComponent,
    UserManagementComponent,
    ToolManagementComponent
  ]
})

export class UserLayoutModule {}
