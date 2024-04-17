import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './layout-security.routes';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutSecurityComponent } from './layout-security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutSecurityComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    LayoutSecurityComponent
  ]
})
export class LayoutSecurityModule { }
