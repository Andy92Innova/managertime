import { Routes } from "@angular/router";
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { SecurityGuard } from "../../guards/security-guard.guard";

export const routes : Routes = [
  { path:'login', component: LoginComponent, canActivate:[SecurityGuard]},
  { path:'register', component: RegisterComponent, canActivate:[SecurityGuard]},
  { path:'', redirectTo:'login', pathMatch: 'full'}
];


