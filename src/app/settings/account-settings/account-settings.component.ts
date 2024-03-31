import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  isLoading: boolean = true;



  constructor(private _AuthService:AuthService ) { }
  ngOnInit(): void {
    this.getUserInfo();
    this.isLoadingLayer();
  }
  
  getUserInfo() {
    this._AuthService.decodeUserToken();
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = localStorage.getItem('userName') || '';
    this.userRole = this._AuthService.userData.getValue().role;
  }

  isLoadingLayer() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      this.isLoading = false;
    }, 1000)
  }

  url = 'assets/profile(1).png';
  onSelect(event:any){
    if(event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    }
  }
}