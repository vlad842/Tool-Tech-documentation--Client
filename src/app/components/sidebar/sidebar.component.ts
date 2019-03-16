import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/layouts/authentication-layout/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permission: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', permission:"all" },
    { path: '/report', title: 'Report',  icon: 'dashboard', class: '',permission:"all" },
    { path: '/management/tools', title: 'Tools Management',  icon: 'dashboard', class: '', permission:"admin"},
    { path: '/management/users', title: 'Users Management',  icon: 'dashboard', class: '', permission:"admin"},
    { path: '/management/tags', title: 'Tags Management',  icon: 'dashboard', class: '', permission:"admin"}

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => {
        return  ((menuItem.permission === "all") ||
                (menuItem.permission === "admin" && this.userService.isAdmin()));
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
