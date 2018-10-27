import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../services/tools.service';
import { RecordesService } from '../services/records.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reportForm :  FormGroup;
  reportTextArea:FormControl;

  tools = [];
  chambers = [];
  selectedTool;
  selectedChamber;
  
  constructor(private recordesService:RecordesService,
              private toolsService:ToolsService) { }

  ngOnInit() {

    this.reportTextArea = new FormControl('',[]);
    this.reportForm = new FormGroup({
      reportTextArea: this.reportTextArea
    },[Validators.required])


    this.toolsService.getAllTools()
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.tools=data;
        if(this.tools.length)
        {
          this.selectedTool = this.tools[0].serialNumber;
          this.chambers = this.tools[0].chambers;
          this.selectedChamber =this.chambers[0].serialNumber;
        }
      },
      error => {
      });
  }

  toolChanged(event)
  {
    let tool = this.tools.find((elem) => elem.serialNumber === event.value);
    console.log(tool);
    this.chambers = tool.chambers;
    this.selectedChamber = this.chambers[0].serialNumber;

  }

  onSubmitReport(){
    const tool_id = (this.tools.find((elem) => elem.serialNumber === this.selectedTool))._id;
    this.recordesService.addRecord(tool_id,this.selectedChamber,this.reportTextArea.value)
    .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          console.log("ERROR",error);
        });



  }

}
