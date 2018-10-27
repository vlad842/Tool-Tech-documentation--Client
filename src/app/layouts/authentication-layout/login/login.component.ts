import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //Form group.
  loginForm :  FormGroup;

  //All from controllers.
  email:        FormControl;
  password:     FormControl;
  password_hide:boolean;
  returnUrl:    string;
  submitError: {exist:boolean,message:string};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.logout();

    this.password_hide = true;

    this.loginForm = new FormGroup(
      this.createAllFormControls(),
      this.createAllControlsValidators()
      );

      this.submitError={exist:false,message:""};
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createAllFormControls(){
    this.email = new FormControl('',[Validators.email]);
    this.password = new FormControl('',[]);
    return {
      email : this.email,
      password : this.password}
  }

  createAllControlsValidators(){
    return [Validators.required];
  }

  getErrorMessage(filed)
  {
    return filed.hasError('required') ? 'You must enter a value' :
           filed.hasError('email') ? 'Not a valid email' : "";
  }

  onForgotPassword(){

  }

  onSubmit(){

    //Subbmiting only if form is valid
    if(this.loginForm.valid)
    {
      this.userService.login(this.email.value,this.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.onSuccessfulLogin(data);
        },
        error => {
          this.onUnsuccessfulLogin(error);
        });
    }
  }

  private onSuccessfulLogin(data){
    console.log("this.returnUrl",this.returnUrl);
    this.router.navigate([this.returnUrl]);
  }

  private onUnsuccessfulLogin(error){
    console.log(error);
    this.submitError.exist=true;
    this.submitError.message=error.error.msg;
  }

}
