import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiError: string = ''

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required,
    Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  })
  ngOnInit(): void {
    this.isLoadingMethod()
  }

  isLoadingMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  resetPassword(dataForm: FormGroup) {
    this.isLoading = true
    this._AuthService.resetPassword(dataForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        this._Router.navigate(['/login'])
      },
      error: (err) => {
        this.isLoading = false
        this.apiError = err.error.message
        console.log(err);
      }
    })
  }
}
