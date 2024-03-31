import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent {
  panelOpenState = false;
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiMessage: string = ''
  isError: boolean = false
  userName: string = '';
  updateUserDataForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  constructor(
    private _AuthService: AuthService,
    private _Router:Router
  ) { }

  updateUserData(dataForm: any) {
    this.isLoading = true
    this._AuthService.updateLoggedUserData(dataForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem("userEmail", this.updateUserDataForm.get('email')?.value);
        localStorage.setItem("userName", this.updateUserDataForm.get('name')?.value);
        this.isLoading = false
        this.apiMessage = res.message
        this.isError = false
        this._Router.navigate(['/settings/accountSettings'])
        console.log(res)
      },
      error: (err) => {
        this.isLoading = false
        this.isError = true
        this.apiMessage = err.error.errors.msg
        console.log(err)
      }
    })
  }
}

