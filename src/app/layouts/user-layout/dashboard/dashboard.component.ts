import { Component, OnInit } from '@angular/core';
import { RecordesService } from '../services/records.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  records = [];
  constructor( private recordesService:RecordesService) { }

  ngOnInit() {

    this.recordesService.getAllRecordes()
    .pipe(first())
    .subscribe(
      data => {
        console.log("Data",data);
        this.records=data;
      },
      error => {
      });
  }

}
