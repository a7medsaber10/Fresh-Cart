import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiError: string = ''

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }
  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6,10}$/)]),
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

  verifyCode(dataForm: FormGroup) {
    this.isLoading = true
    this._AuthService.verifyCode(dataForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        this._Router.navigate(['/settings/resetPassword'])
      },
      error: (err) => {
        this.isLoading = false
        this.apiError = err.error.message
        console.log(err);
      }
    })
  }
}
