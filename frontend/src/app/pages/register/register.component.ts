import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../utils/constants';
import { passwordMatchValidator } from '../../shared/formValidators/register.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  private authenticationService = inject(AuthenticationService);
  private userService = inject(UserService);
  private router = inject(Router);
  private formBuilder  = inject(FormBuilder);

  formRegister: FormGroup = this.formBuilder.group({
    user_name: ['', Validators.required],
    user_email: ['', [Validators.required, Validators.email]],
    user_pass: ['', Validators.required],
    user_pass_valid: ['', Validators.required],
    agree_terms: [false, Validators.required],
  }, {
    validators: passwordMatchValidator
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  register() {

    //compare password validation

    // const model: NewUserRequest = {
    //   user_name: this.formRegister.get('user_name')?.value,
    //   user_email: this.formRegister.get('user_email')?.value,
    //   user_pass: this.formRegister.get('user_pass')?.value,
    //   agree_terms: this.formRegister.get('agree_terms')?.value
    // };

    // console.log(this.formRegister.value);

    this.userService.addUser(this.formRegister.value).subscribe({
      next: (register_res) => {
        if (register_res.was_inserted) {
          const model = {
            user_email: this.formRegister.get('user_email')?.value,
            user_pass: this.formRegister.get('user_pass')?.value
          }
          this.authenticationService.login(model).subscribe({
            next: (login_res) => {
              if (login_res?.isLogin) {
                this.router.navigateByUrl(ROUTES.ROUTE_HOME);
              } else {
                console.log(login_res?.messsage);
              }
            },
            error: (err) => console.log(err)
          });
        }
      },
      error: (err) => console.log(err)
    });
  }

  login() {
    this.router.navigateByUrl(ROUTES.ROUTE_LOGIN);
  }

}
