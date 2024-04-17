import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { faDownload, faHourglass, faList, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { TaskResponse } from '../../models/response/task-response';
import { TaskService } from '../../services/ManagerTime/task.service';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEnvironmentModalComponent } from './modals/new-environment-modal/new-environment-modal.component';
import { NewTaskModalComponent } from './modals/new-task-modal/new-task-modal.component';
import { ActiveTask } from '../../models/view-model/mainVM';
import { PauseTaskRequest, AddTaskRequest } from '../../models/request/task-request';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnDestroy, OnInit {

  private modalService = inject(NgbModal);
  private taskService = inject(TaskService);

  faPause = faPause;
  faPlay = faPlay;
  faList = faList;
  faHourglass = faHourglass;
  faDownload = faDownload

  isPaused = false;
  message: string = '';

  tasksActivedResult: TaskResponse[] = [];
  tasksCompletedResult: TaskResponse[] = [];

  activeTask !: ActiveTask;
  intervalCounterTask: any;
  formatBTime: string = '00:00:00';
  message_pause_main: string = '';

  constructor() {
    this.defaultActiveTask();
  }

  ngOnInit(): void {
    this.getTasks();

    //localStorage.removeItem('activeTask');

    if (localStorage.getItem('activeTask') != null) {
      let value = localStorage.getItem('activeTask') ?? '';
      this.activeTask = JSON.parse(value);

      this.taskService.getTask(this.activeTask.env_id, this.activeTask.task_id).subscribe({
        next: (data) => {
          this.activeTask = {
            env_id: data.env_id,
            env_name: data.env_name,
            task_id: data.task_id,
            task_name: data.task_name,
            active: !data.paused,
            counter_time: data.times
          }

          this.formatBreakTime();
        },
        error: (err) => this.message_pause_main = err
      })
    }

    window.onbeforeunload = () => this.ngOnDestroy();

  }

  ngOnDestroy() {
    this.changeStatusTask();
  }

  defaultActiveTask() {
    this.activeTask = {
      env_id: 0,
      env_name: '-',
      task_id: 0,
      task_name: '-',
      counter_time: 0,
      active: false
    }
  }

  getTasks(): void {
    forkJoin([
      this.taskService.getTasks(false),
      this.taskService.getTasks(true),
    ]).subscribe({
      next: (results) => {
        this.tasksActivedResult = results[0];
        this.tasksCompletedResult = results[1];
      },
      error: (err) => this.showMsgOnTable(`There is an error to load the data: ${err}`)
    });
  }

  openModal(type: string): void {
    if (type === 'env') {
      this.openEnvModal();
    } else {
      this.openTaskModal();
    }
  }

  openEnvModal(): void {
    const modalRef = this.modalService.open(NewEnvironmentModalComponent);
  }

  openTaskModal(): void {
    const modalRef = this.modalService.open(NewTaskModalComponent);
    modalRef.componentInstance.taskAdded.subscribe((data: AddTaskRequest) => {
      this.taskAdded(data);
    });
  }

  changeStatusActiveTask(model: PauseTaskRequest, stopAllTaskActive: boolean = false): void {
    this.stopCounterTime();

    //from tableresult
    if (stopAllTaskActive) {
      this.changeStatusTask();
    }

    this.taskService.pauseTask(model).subscribe({
      next: (data) => {
        this.activeTask = {
          env_id: data.env_id,
          env_name: data.env_name,
          task_id: data.task_id,
          task_name: data.task_name,
          active: !data.paused,
          counter_time: data.times
        }

        localStorage.setItem('activeTask', JSON.stringify(this.activeTask));

        //this mean that task must be active
        if (this.activeTask.active) {
          this.startCounterTime();
        }

        this.getTasks();

      },
      error: (err) => this.message = err
    });
  }

  changeStatusTask() {
    //from main
    if (this.activeTask.env_name === '-' || this.activeTask.task_id === 0) {
      this.message_pause_main = 'Task invalid';
    } else {

      const model: PauseTaskRequest = {
        env_id: this.activeTask.env_id,
        task_id: this.activeTask.task_id,
        times: !this.activeTask.active ? 0 : this.activeTask.counter_time,
        paused: this.activeTask.active
      }

      this.changeStatusActiveTask(model);
    }
  }

  taskCompleted(model: any): void {
    if (model.task_id !== undefined || model.task_id !== 0) {
      this.stopCounterTime();
      this.clearFormatTime();
      localStorage.removeItem('activeTask');

      const model: PauseTaskRequest = {
        env_id: this.activeTask.env_id,
        task_id: this.activeTask.task_id,
        times: this.activeTask.counter_time,
        paused: true
      };

      this.taskService.pauseTask(model).subscribe((pause_response) => {
        if (pause_response.paused) {
          this.defaultActiveTask();
          this.taskService.completeTask(model).subscribe({
            next: (data) => {
              this.showMsgOnTable(`Task ${data.task_id} was completed.`);
              this.getTasks();
            },
            error: (err) => this.showMsgOnTable(err)
          });
        }
      });
    }
  }

  taskAdded(model: any): void {
    console.log('New taks: ', model)
    this.taskService.addTask(model).subscribe({
      next: (response) => {
        this.showMsgOnTable(`Task ${response.message} was added successfully`);
        this.getTasks();
      },
      error: (err) => this.showMsgOnTable(err)
    })
  }



  startCounterTime(): void {
    this.intervalCounterTask = setInterval(() => {
      this.activeTask.counter_time += 1;
      this.formatBreakTime();
    }, 1000);
  }

  stopCounterTime(): void {
    clearInterval(this.intervalCounterTask);
  }

  formatBreakTime(): void {
    let segundos = this.activeTask.counter_time;

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    const formatoHoras = horas < 10 ? `0${horas}` : `${horas}`;
    const formatoMinutos = minutos < 10 ? `0${minutos}` : `${minutos}`;
    const formatoSegundos = segundosRestantes < 10 ? `0${segundosRestantes}` : `${segundosRestantes}`;

    const value = `${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;

    this.formatBTime = value;
  }

  clearFormatTime() {
    this.formatBTime = '00:00:00';
  }

  showMsgOnTable(msg: string): void {
    this.message = msg;

    setTimeout(() => {
      this.message = '';
    }, 2000);
  }
}
