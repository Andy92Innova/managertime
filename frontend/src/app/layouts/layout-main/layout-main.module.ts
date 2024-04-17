import { NgModule } from '@angular/core';
import { LayoutMainComponent } from './layout-main.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from '../../pages/main/main.component';
import { SearchComponent } from '../../shared/search/search.component';
import { TableResultComponent } from '../../shared/table-result/table-result.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorProvider } from '../../interceptors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecurityGuard } from '../../guards/security-guard.guard';

const routes: Routes = [
  { path: 'home', component: MainComponent, canActivate: [SecurityGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LayoutMainComponent,
    MainComponent,
    SearchComponent,
    TableResultComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
  ,
  providers: [
    AuthInterceptorProvider
  ],
  exports: [
    LayoutMainComponent
  ]
})
export class LayoutMainModule { }
