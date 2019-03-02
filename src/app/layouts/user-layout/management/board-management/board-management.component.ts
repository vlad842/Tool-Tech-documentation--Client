import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-management',
  templateUrl: './board-management.component.html',
  styleUrls: ['./board-management.component.scss']
})
export class BoardManagementComponent implements OnInit {

  boardLinks = [{name:'Users',path:"users"},
  {name:'Tools',path:"links"}];

  constructor( private router:Router) { }

  ngOnInit() {
  }

  onRouteClick(url){
    alert(url);
    this.router.navigate([url]);
  }

}
