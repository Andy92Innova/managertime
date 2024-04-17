import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AddTaskRequest, CommonTaskRequest, PauseTaskRequest } from '../../models/request/task-request';
import { TaskResponse } from '../../models/response/task-response';
import { AddResponse } from '../../models/response/shared-response';
import { TASK_SUFIX_API } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL_API !: string;

  constructor(private httpClient: HttpClient) {
    this.URL_API = environment.API_MANAGER_TIME + environment.API_TASK;
  }

  getTasks(completed: boolean): Observable<TaskResponse[]> {

    let url = this.URL_API + TASK_SUFIX_API.GET_TASKS;

    const params = new HttpParams()
      .set('completed', completed);

    return this.httpClient.get<TaskResponse[]>(url, { params });

  }

  getTask(env_id: number, task_id: number): Observable<TaskResponse> {

    let url = this.URL_API + TASK_SUFIX_API.GET_TASK;

    const params = new HttpParams()
      .set('env_id', env_id)
      .set('task_id', task_id);

    return this.httpClient.get<TaskResponse>(url, { params });

  }

  addTask(model: AddTaskRequest): Observable<AddResponse> {
    let url = this.URL_API + TASK_SUFIX_API.ADD_TASK;

    return this.httpClient.post<AddResponse>(url, model);
  }

  completeTask(model: CommonTaskRequest): Observable<TaskResponse> {
    let url = this.URL_API + TASK_SUFIX_API.COMPLET_TASK;

    const params = new HttpParams()
      .set('env_id',model.env_id)
      .set('task_id', model.task_id);

    return this.httpClient.patch<TaskResponse>(url, null, { params })
  }

  pauseTask(model: PauseTaskRequest): Observable<TaskResponse> {
    let url = this.URL_API + TASK_SUFIX_API.PAUSE_TASK;
    return this.httpClient.patch<TaskResponse>(url, model);
  }


}
