import { NgModule } from '@angular/core';

// import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutMainModule } from './layouts/layout-main/layout-main.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutSecurityModule } from './layouts/layout-security/layout-security.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuardService } from './services/guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    LayoutMainModule,
    LayoutSecurityModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationGuardService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
