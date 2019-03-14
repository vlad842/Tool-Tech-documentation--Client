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
  records:string[]  = [];
  tools             = [];
  chambers:string[] = [];
  selectedChamber:string;
  selectedTool:string;

  constructor( private dialog: MatDialog,
               private recordesService:RecordesService,
               private toolsService:ToolsService,
               private tagsService:TagsService) { }

  ngOnInit() {

      this.selectedChamber = "allChambers";
      this.selectedTool = "allTools";

      this.fillTools();

      this.fillChambers(this.selectedTool);
  
      this.fillRecords();

      this.fillTags();

  }

  private fillTags(){
    this.tagsService.getTags()
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.tags = data;

        /*this.filteredTags = this.tagsFormControl.valueChanges.pipe(
          startWith(null),
          map((tag: Tag | null) => tag ? this._filter(tag) : this.allTags.slice()));*/
      },
      error => {
      });
  }

  private fillRecords()
  {
    const tool_id = this.selectedTool !== 'allTools' ? this.selectedTool: undefined;
    const chamber_number = this.selectedChamber !== 'allChambers' ? this.selectedChamber : undefined;


    this.recordesService.getRecords(tool_id,chamber_number)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
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
    if(tool_id == 'allTools')
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
    this.selectedChamber = 'allChambers';
    this.fillRecords();

  }

  chamberChanged(e)
  {
    if(this.selectedTool == 'allTools')
    {
      this.selectedChamber == 'allChambers';
    }
    else
    {
      this.fillRecords();
    }

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
            },
            error => {
            });

        }
      }
  );  
}

}
