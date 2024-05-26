import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HomeComponent } from 'src/app/component/home/home.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ToastModule,
    FileUploadModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class UserModule { }
