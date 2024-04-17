import { Routes } from '@angular/router';
import { SecurityGuard } from './guards/security-guard.guard';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'security', loadChildren: () => import('./layouts/layout-security/layout-security.module').then(m => m.LayoutSecurityModule) },
  { path: 'main', loadChildren: () => import('./layouts/layout-main/layout-main.module').then(m => m.LayoutMainModule)},
  // {path:'register', loadChildren: ()=> import('./layouts/layout-register/layout-register.module').then(m=>m.LayoutRegisterModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto,
  { path: '**', component: PageNotFoundComponent }
];
