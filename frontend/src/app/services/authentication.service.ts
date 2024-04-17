import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpClient = inject(HttpClient);
  private userService = inject(UserService);

  private URL_API !: string;
  isLogin: boolean = false;

  setLogeo = new BehaviorSubject<boolean>(false);
  setLogeo$ = this.setLogeo.asObservable();


  constructor() {
    this.URL_API = environment.API_MANAGER_TIME;

    if (localStorage.getItem('user-status') != null) {
      const value = JSON.parse(localStorage.getItem('user-status') ?? '');
      this.isLogin = value?.isLogin;
    }
  }

  login(model: any): Observable<any> {
    const url = this.URL_API + environment.API_LOGIN;

    return this.httpClient.post<string>(url, model).pipe(
      map((data: any) => {
        if (data?.message === undefined) {
          localStorage.setItem('token', data?.token);
          localStorage.setItem('user-status', JSON.stringify({ isLogin: true, message: '' }))
          this.isLogin = true;

          this.userService.getUserP().subscribe({
            next: (user) => {
              localStorage.setItem('user', JSON.stringify(user));
            }
          })

          return { isLogin: true, message: '' };
        } else {
          console.log(data?.message);
          return { isLogin: false, message: data?.message };
        }
      }));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem('user-status');
    localStorage.removeItem('activeTask');
    localStorage.removeItem('user');

    this.isLogin = false;

    return of(true);
  }

  setLogin(): void {
    this.setLogeo.next(true);
  }

}
