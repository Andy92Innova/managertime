import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTES } from '../../utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../assets/css/layout-login/Customizable-Background--Overlay.css',
    '../../../assets/css/layout-login/Login-Box-En.css']
})
export class LoginComponent {
  //services
  private formBuilderservice = inject(FormBuilder);
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

  isCollapsed !: boolean;

  formLogin: FormGroup = this.formBuilderservice.group({
    user_email: ['', [Validators.required, Validators.email]],
    user_pass: ['', Validators.required]
  })

  constructor() {
    this.isCollapsed = false;
  }

  login(): void {

    console.log(this.formLogin);

    if (this.formLogin.valid) {

      this.authenticationService.login(this.formLogin.value).subscribe((data) => {
        if (data?.isLogin) {
          this.router.navigateByUrl(ROUTES.ROUTE_HOME);
        } else {
          console.log(data?.messsage);
        }
      });
    } else {
      console.log(this.formLogin.errors);
    }
  }
}
