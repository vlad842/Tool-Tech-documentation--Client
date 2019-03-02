import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToolsManagementService } from './tools-management.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-tool-management',
  templateUrl: './tool-management.component.html',
  styleUrls: ['./tool-management.component.scss']
})
export class ToolManagementComponent implements OnInit {

  displayedColumns: string[] = ['serial_number','chamber1', 'chamber2','chamber3','chamber4','chamber5','actions'];
  dataSource = new MatTableDataSource([]);
  all_tools_data = [];
  
  addToolForm :  FormGroup;
  toolSerialNumber:        FormControl;
  selectedChamber1:string;
  selectedChamber2:string;
  selectedChamber3:string;
  selectedChamber4:string;
  selectedChamber5:string;
  submitToolError: {exist:boolean,message:string};
  chambers = [];

  constructor(private router:Router, private toolsManagmentService:ToolsManagementService) { }

  ngOnInit() {
    this.setAddToolsForm();
    this.setAllToolsTable();
  }

  private setAllToolsTable(){
    this.toolsManagmentService.getAllTools().subscribe((all_tools)=>{
      this.all_tools_data = all_tools.map((tool)=>{
        return {
          _id:tool._id,
          serial_number:tool.serialNumber,
          chamber1:tool.chambers[0].kind,
          chamber2:tool.chambers[1].kind,
          chamber3:tool.chambers[2].kind,
          chamber4:tool.chambers[3].kind,
          chamber5:tool.chambers[4].kind,
        }
      });
      this.dataSource = new MatTableDataSource(this.all_tools_data);
    });
  }

  private setAddToolsForm(){
    this.submitToolError={exist:false,message:""};
    this.toolSerialNumber = new FormControl('',[]);
    this.addToolForm = new FormGroup(
      {toolSerialNumber: this.toolSerialNumber},
      [Validators.required]
      );
    this.toolsManagmentService.getAllChambersKindes()
    .pipe(first())
    .subscribe(
      data => {
        this.chambers=data;
        this.selectedChamber1 = this.selectedChamber2 = this.selectedChamber3 = this.selectedChamber4 =this.selectedChamber5 = this.chambers[0];
      },
      error => {
      });

  }

  onSubmitTool(){
    const chambers_names = [
      {
        serialNumber: 1,
        kind: this.selectedChamber1
      },{
        serialNumber: 2,
        kind: this.selectedChamber2
      },      {
        serialNumber: 3,
        kind: this.selectedChamber3
      },      {
        serialNumber: 4,
        kind: this.selectedChamber4
      },      {
        serialNumber: 5,
        kind: this.selectedChamber5
      }
    ];
    const serialNumber = this.toolSerialNumber.value;
    //Subbmiting only if form is valid
    if(this.addToolForm.valid)
    {
      this.toolsManagmentService.addTool(serialNumber,chambers_names)
      .pipe(first())
      .subscribe(
        data => {
          this.onSuccessfulToolAdd(data);
        },
        error => {
          this.onUnsuccessfulToolAdd(error)
        });;
    }
  }

  private onSuccessfulToolAdd(data){
    this.addToolForm.reset();
    alert("Tool added successfuly");
    this.setAllToolsTable();
  }

  private onUnsuccessfulToolAdd(error){
    this.submitToolError.exist=true;
    this.submitToolError.message=error.error;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onButtonToolDeleteClick(tool_id:string){
    this.toolsManagmentService.deleteTool(tool_id).subscribe(data =>{
      alert("Tool deleted successfully");
      this.setAllToolsTable();
    },
    error =>{
      alert("cannot delete this Tool");
    });
  }
}
