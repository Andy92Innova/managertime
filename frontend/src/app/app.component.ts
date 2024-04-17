import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  isLogin !: boolean;

  constructor(
    public authenticationService: AuthenticationService
  ) {
    this.isLogin = this.authenticationService.isLogin ?? false;
  }

}
