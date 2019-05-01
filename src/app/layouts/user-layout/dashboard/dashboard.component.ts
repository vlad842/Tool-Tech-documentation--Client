import { Component, OnInit } from '@angular/core';
import { RecordesService } from '../services/records.service';
import { first } from 'rxjs/operators';
import { ToolsService } from '../services/tools.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { TagsService } from '../services/tags.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tags = [];
  records:any[]  = [];
  tools             = [];
  chambers:string[] = [];
  selectedChamber:string;
  selectedTool:string;
  selectedTag:string;

  constructor( private dialog: MatDialog,
               private recordesService:RecordesService,
               private toolsService:ToolsService,
               private tagsService:TagsService) { }

  ngOnInit() {

      this.selectedChamber = "*";
      this.selectedTool = "*";
      this.selectedTag = "*";

      this.fillTools();

      this.fillChambers(this.selectedTool);
  
      this.fillTags();

      this.fillRecords();


  }

  private fillTags(){
    this.tagsService.getTags()
    .pipe(first())
    .subscribe(
      data => {
        console.log('this.tags',data);
        this.tags = data;
      },
      error => {
      });
  }

  private fillRecords()
  {
    const tool_id = this.selectedTool !== '*' ? this.selectedTool: '*';
    const chamber_number = this.selectedChamber !== '*' ? this.selectedChamber : '*';
    const tag_id = this.selectedTag !== '*' ? this.selectedTag : '*';


    this.recordesService.getRecords(tag_id,tool_id,chamber_number)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        data.forEach(record => {
          record.status_color = record.status === 'In progress' ? 'red' : record.status === 'Resolved' ? 'green' : record.status === 'Resolved and follow up' ? 'yellow' : '';
          
        });
        this.records=data;
      },
      error => {
      });
  }

  private fillTools()
  {
    this.toolsService.getAllTools()
    .pipe(first())
    .subscribe(
      data => {
        this.tools=data;
      },
      error => {
      });
  }

  private fillChambers(tool_id?:string)
  {
    console.log(tool_id);
    console.log(this.tools);
    if(tool_id == '*')
    {
      this.chambers=[];
    }
    else
    {
      this.chambers = this.tools.find((tool) => tool._id == tool_id).chambers.map((chamber) =>{return `${chamber.serialNumber} - ${chamber.kind}`} );
    }
  }

  toolChanged(e)
  {
    this.fillChambers(this.selectedTool);
    this.selectedChamber = '*';
    this.fillRecords();

  }

  chamberChanged(e)
  {
    if(this.selectedTool == '*')
    {
      this.selectedChamber == '*';
    }
    else
    {
      this.fillRecords();
    }

  }

  tagChanged(e)
  {
    this.fillRecords();

  }

  addComment(record_id){
    this.openDialog(record_id);
  }

  openDialog(record_id) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      tags:this.tags,
      record_id
    }

    let dialogRef = this.dialog.open(CommentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) =>{
        if(data){
          this.tagsService.addTag(data.record_id,data.tags,data.content)
          .pipe(first())
          .subscribe(
            res => {
              console.log(res);
              this.fillRecords();

            },
            error => {
            });

        }
      }
  );  
}

}
