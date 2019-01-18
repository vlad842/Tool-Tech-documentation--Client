import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { ManagementComponent } from './management/management.component';
import { AdminGuard } from '../../layouts/authentication-layout/admin.guard';

export const UserLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'report',         component: ReportComponent },
    //{ path: 'management',     component: ManagementComponent},
    {
        path: 'management',
        component: ManagementComponent,
        canActivate: [AdminGuard]
//        children: [{
//          canActivateChild: [AdminGuard],
//          path: '',
//          loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
//      }]
    }
];
