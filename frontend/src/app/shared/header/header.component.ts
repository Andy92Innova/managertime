import { Component, OnInit, inject } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ROUTES } from '../../utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  public authenticationService = inject(AuthenticationService)
  private router = inject(Router);

  faCoffee = faCoffee;

  USER: any;

  constructor() {}

  ngOnInit(): void {
    setTimeout(()=>{
      this.getUserData();
    }, 2000);
  }

  getUserData(){
    const value = localStorage.getItem('user');
    if(value != null){
      this.USER = JSON.parse(value ?? '');
    }
  }

  login() {
    this.router.navigateByUrl(ROUTES.ROUTE_LOGIN);
  }

  singUp() {
    this.router.navigateByUrl(ROUTES.ROUTE_REGISTER);
  }

  logout(): void {
    this.authenticationService.logout().subscribe((data) => {
      this.router.navigateByUrl(ROUTES.ROUTE_LOGIN);
    });
  }

}
