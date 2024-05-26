import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { LoginComponent } from '../component/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // todo: signup page
  // {
  //   path: 'signup',
  //   component: SignupComponent
  // },
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MessageService
  ]
})
export class AuthModule { }
