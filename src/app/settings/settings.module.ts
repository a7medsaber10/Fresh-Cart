import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../components/loader/loader.component';
import { CollapseComponent } from './collapse/collapse.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyCodeComponent,
    UpdatePasswordComponent,
    UpdateDataComponent,
    CollapseComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    LoaderComponent // stand alone
  ]
})
export class SettingsModule { }
