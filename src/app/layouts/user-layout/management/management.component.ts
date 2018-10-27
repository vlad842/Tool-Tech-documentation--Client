import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToolsService } from '../services/tools.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  @ViewChild('chambersList') chambersList;
  addToolForm :  FormGroup;
  toolSerialNumber:        FormControl;
  selectedChamber1:string;
  selectedChamber2:string;
  selectedChamber3:string;
  selectedChamber4:string;
  selectedChamber5:string;
  submitToolError: {exist:boolean,message:string};

  chambers = [];
  constructor(private toolsService:ToolsService) { }

  ngOnInit() {
    this.setChambersForm();
  }

  private setChambersForm(){
    this.submitToolError={exist:false,message:""};
    this.toolSerialNumber = new FormControl('',[]);
    this.addToolForm = new FormGroup(
      {toolSerialNumber: this.toolSerialNumber},
      [Validators.required]
      );
    this.toolsService.getAllChambersKindes()
    .pipe(first())
    .subscribe(
      data => {
        this.chambers=data;
        this.selectedChamber1 = this.selectedChamber2 = this.selectedChamber3 = this.selectedChamber4 =this.selectedChamber5 = this.chambers[0];
        console.log(this.selectedChamber1);
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
      this.toolsService.addTool(serialNumber,chambers_names)
      .pipe(first())
      .subscribe(
        data => {
          console.log("data",data);
          this.onSuccessfulToolAdd(data);
        },
        error => {
          this.onUnsuccessfulToolAdd(error)
        });;
    }
  }

  private onSuccessfulToolAdd(data){
    this.submitToolError.exist=false;
    this.submitToolError.message = '';
    this.toolSerialNumber.markAsUntouched();
    this.toolSerialNumber.reset();
    this.selectedChamber1 = this.selectedChamber2 = this.selectedChamber3 = this.selectedChamber4 =this.selectedChamber5 = this.chambers[0];


  }

  private onUnsuccessfulToolAdd(error){
    this.submitToolError.exist=true;
    this.submitToolError.message=error.error.message;
  }

}
