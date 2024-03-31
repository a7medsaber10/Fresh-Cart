import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiMessage: string = ''
  rePasswordError: object = { rePasswordMatch: "rePassword does not match password" }

  updateUserPasswordForm:FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  },{validators: this.checkRePassword})

  checkRePassword(dataForm: any) {
    if (dataForm.get("password")?.value === dataForm.get("rePassword")?.value)
      return null;
    else {
      dataForm.get("rePassword")?.setErrors({ rePasswordMatch: "rePassword does not match password" })
      return { rePasswordMatch: "rePassword does not match password" }
    }
  }

  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
    this.isLoadingLayerMethod()
  }

  updatePassword(dataForm: any) {
    this.isLoading = true
    this._AuthService.updateLoggedUserPasswords(dataForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false
        this._AuthService.logOut()
        console.log(res)
      },
      error: (err) => {
        this.isLoading = false
        this.apiMessage = err.error.errors.msg
        console.log(err)
      }
    })
  }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  visiblePass:boolean = true;
  changeTypePass:boolean = true;
  visibleReNewPass:boolean = true;
  changeTypeReNewPass:boolean = true;
  visibleNewPass:boolean = true;
  changeTypeNewPass:boolean = true;
  pass:string = 'currentPassword';
  newPass:string = 'passwordInput';
  newRePass:string = 'repasswordInput';
  viewPass(id:string){
    if (id == this.pass) {
      this.visiblePass = !this.visiblePass;
      this.changeTypePass = !this.changeTypePass;
    } else if (id == this.newPass){
      this.visibleNewPass = !this.visibleNewPass;
      this.changeTypeNewPass = !this.changeTypeNewPass;
    } else if (id == this.newRePass){
      this.visibleReNewPass = !this.visibleReNewPass;
      this.changeTypeReNewPass = !this.changeTypeReNewPass;
    }
  }
}
