import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserManagementService } from './user-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['isAdmin','name', 'email','actions'];
  dataSource = new MatTableDataSource([]);
  all_users_data = [];
  
  addUserForm : FormGroup;
  email:        FormControl;
  password:     FormControl;
  fullName:     FormControl;
  user_role:    FormControl;
  submitUserError: {exist:boolean,message:string};
  
  constructor(private router:Router, private userManagmentService:UserManagementService) { }

  ngOnInit() {
    this.setAddUsersForm();
    this.setAllUsersTable();
  }

  private setAllUsersTable(){
    this.userManagmentService.getAllUsers().subscribe((all_users)=>{
      this.all_users_data = all_users;
      this.dataSource = new MatTableDataSource(this.all_users_data);
    });
  }

  private setAddUsersForm(){
    this.submitUserError={exist:false,message:""};
    this.email = new FormControl('',[Validators.email]);
    this.fullName = new FormControl('',[]);
    this.password = new FormControl('',[]);
    this.user_role = new FormControl('',[]);

    this.addUserForm = new FormGroup(
      {email: this.email, fullName: this.fullName,password: this.password, user_role:this.user_role},
      [Validators.required]
      );

  }

  onSubmitUser(){

    if(this.addUserForm.valid)
    {
      this.userManagmentService.signup(this.fullName.value,this.email.value,this.password.value,this.user_role.value)
      .pipe(first())
      .subscribe(
        data => {
          this.onSuccessfulUserAdd(data);
        },
        error => {
          this.onUnsuccessfulUserAdd(error)
        });;
    }
  }

  private onSuccessfulUserAdd(data){

    alert("User added successfuly");
    this.addUserForm.reset();
    this.setAllUsersTable();
  }

  private onUnsuccessfulUserAdd(error){
    
    this.submitUserError.exist=true;
    this.submitUserError.message=error.error.message;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onButtonUserDeleteClick(user_id:string){
    this.userManagmentService.deleteUser(user_id).subscribe(data =>{
      alert("User deleted successfully");
      this.setAllUsersTable();
    },
    error =>{
      alert("cannot delete this user");
    });
  }

}
