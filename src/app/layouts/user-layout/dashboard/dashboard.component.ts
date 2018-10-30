import { Component, OnInit } from '@angular/core';
import { RecordesService } from '../services/records.service';
import { first } from 'rxjs/operators';
import { ToolsService } from '../services/tools.service';
import { ivyEnabled } from '@angular/core/src/ivy_switch';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  records:string[]  = [];
  tools             = [];
  chambers:string[] = [];
  selectedChamber:string;
  selectedTool:string;

  constructor( private recordesService:RecordesService,
               private toolsService:ToolsService) { }

  ngOnInit() {

      this.selectedChamber = "allChambers";
      this.selectedTool = "allTools";

      this.fillTools();

      this.fillChambers(this.selectedTool);
  
      this.fillRecords();

  }

  private fillRecords()
  {
    const tool_id = this.selectedTool !== 'allTools' ? this.selectedTool: undefined;
    const chamber_number = this.selectedChamber !== 'allChambers' ? this.selectedChamber : undefined;


    this.recordesService.getRecords(tool_id,chamber_number)
    .pipe(first())
    .subscribe(
      data => {
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
    console.log("tool_id",tool_id)
    if(tool_id == 'allTools')
    {
      this.toolsService.getAllChambersKindes()
      .pipe(first())
      .subscribe(
        data => {
          this.chambers=data;
        },
        error => {
        });
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

}
