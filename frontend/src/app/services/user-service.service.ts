import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SECURITY_SUFIX_API } from '../utils/constants';
import { GetUserResponse, RegisterResponse } from '../models/response/user-response';
import { NewUserRequest } from '../models/request/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);

  private URL_API !: string;

  constructor() {
    this.URL_API = environment.API_MANAGER_TIME;
  }

  getUser(email:string): Observable<GetUserResponse>{
    const url = this.URL_API + SECURITY_SUFIX_API.GETUSER;

    const params = new HttpParams()
      .set('user_email', email);

    return  this.httpClient.get<GetUserResponse>(url, {params});
  }

  getUserP(): Observable<GetUserResponse>{
    const url = this.URL_API + SECURITY_SUFIX_API.GETUSERP;
    return  this.httpClient.get<GetUserResponse>(url);
  }


  addUser(model:any): Observable<RegisterResponse>{
    const url = this.URL_API + SECURITY_SUFIX_API.REGISTER;

    return this.httpClient.post<RegisterResponse>(url, model);
  }
}
