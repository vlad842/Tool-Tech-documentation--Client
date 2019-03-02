import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { ToolManagementComponent } from './management/tool-management/tool-management.component';
import { UserManagementComponent } from './management/user-management/user-management.component';
import { AdminGuard } from '../../layouts/authentication-layout/admin.guard';

export const UserLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'report',         component: ReportComponent },
    {
        path: 'management/users',
        component: UserManagementComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'management/tools',
        component: ToolManagementComponent,
        canActivate: [AdminGuard]
    },
/*    {
        path: 'management',
        component: ManagementComponent,
        canActivate: [AdminGuard],
        children: [{
          canActivateChild: [AdminGuard],
          path: '',
          loadChildren: './management/management.module#ManagementModule'
      }
    ]
    }*/
];
