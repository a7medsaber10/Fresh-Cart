import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiMessage: string = ''
  isError: boolean = false
  updateUserDataForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  visible = false;
  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  constructor(
    private _AuthService: AuthService,
    private _Router:Router
  ) { }

  updateUserData(dataForm: any) {
    this.isLoading = true
    this._AuthService.updateLoggedUserData(dataForm.value).subscribe({
      next: (res: any) => {
        res.user.name = this.updateUserDataForm.get('name')?.value;
        localStorage.setItem("userEmail", this.updateUserDataForm.get('email')?.value);
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

  ngOnInit(): void {
    this.isLoadingLayerMethod()
  }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }
}

