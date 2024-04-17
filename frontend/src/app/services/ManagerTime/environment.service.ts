import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddEnvironmentRequest } from '../../models/request/environment-request';
import { EnvironmentModelResponse, FinishDayResponse} from '../../models/response/environment-response';
import { AddResponse, DeleteResponse } from '../../models/response/shared-response';
import { ENVIRONMENT_SUFIX_API } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private URL_API !: string;

  constructor(private httpClient: HttpClient) {
    this.URL_API = environment.API_MANAGER_TIME + environment.API_ENV;
  }

  getEnvironments(): Observable<EnvironmentModelResponse[]> {
    let url = this.URL_API + ENVIRONMENT_SUFIX_API.GET_ENVIRONMENTS;
    return this.httpClient.get<EnvironmentModelResponse[]>(url);
  }

  addEnvironment(model: AddEnvironmentRequest): Observable<AddResponse> {
    let url = this.URL_API + ENVIRONMENT_SUFIX_API.ADD_ENVIRONMENT;
    return this.httpClient.post<AddResponse>(url, model);
  }

  deleteEnvironment(env_id: number): Observable<DeleteResponse> {
    let url = this.URL_API + ENVIRONMENT_SUFIX_API.DEL_ENVIRONMENT;

    const params = new HttpParams()
      .set('env_id', env_id);

    return this.httpClient.patch<DeleteResponse>(url, null, { params });
  }
}
