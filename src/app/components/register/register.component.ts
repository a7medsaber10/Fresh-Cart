import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  apiError:string = '';
  isLoadingLayer:boolean = false;
  isLoading: boolean = false; 
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators: this.checkRepasswordMatch});

  ngOnInit(): void {
    this.isLoadingLayerMethod();
  }
  constructor(private _AuthService:AuthService, private _Router: Router) {}

  submitRegister(dataForm:FormGroup) {
    this.isLoading = true;
    console.log(dataForm.value);
    if (dataForm.valid) {
      this._AuthService.signUp(dataForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            localStorage.setItem("userName", this.registerForm.get('name')?.value);
            // navigate page login
            this._Router.navigate(['/login']);
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

  checkRepasswordMatch(dataForm:any) {
    if (dataForm.get("password")?.value === dataForm.get("rePassword")?.value) {
      return null;
    }
    else {
      dataForm.get('rePassword')?.setErrors( {rePasswordMatch: "Re-Password don't match Password!"} )
      return {rePasswordMatch: "Re-Password don't match Password!"}
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
