import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { ManagementComponent } from './management/management.component';

export const UserLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'report',         component: ReportComponent },
    { path: 'management',     component: ManagementComponent}
];
