import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AuthenticationLayoutRoutes: Routes = [
    { path: 'login',      component: LoginComponent  },
    { path: 'signup',     component: SignupComponent }
];
