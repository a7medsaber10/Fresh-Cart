import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  apiError:string = '';
  isLoading:boolean = false; 
  isLoadingLayer:boolean = false; 

  logInForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  });

  ngOnInit(): void {
    this.isLoadingLayerMethod();
  }

  constructor(private _AuthService:AuthService, private _Router: Router) {}

  submitLogin(dataForm:FormGroup) {
    this.isLoading = true;
    console.log(dataForm.value);
    if (dataForm.valid) {
      this._AuthService.signIn(dataForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            // navigate page login
            localStorage.setItem('userToken', response.token);
            localStorage.setItem("userEmail", this.logInForm.get('email')?.value);
            this._AuthService.decodeUserToken();
            this._Router.navigate(['/home']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.apiError = err.error.message;
        }
      });
    }
  }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      this.isLoadingLayer = true;
    }, 1000)
  }


  visiblePass:boolean = true;
  changeTypePass:boolean = true;
  visibleRePass:boolean = true;
  changeTypeRePass:boolean = true;
  pass:string = 'pass';
  rePass:string = 'rePass';
  viewPass(id:string){
    if (id == this.pass) {
      this.visiblePass = !this.visiblePass;
      this.changeTypePass = !this.changeTypePass;
    } else if (id == this.rePass){
      this.visibleRePass = !this.visibleRePass;
      this.changeTypeRePass = !this.changeTypeRePass;
    }
  }
}
