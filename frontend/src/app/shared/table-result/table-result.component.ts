import { Component, EventEmitter, Input, Output, booleanAttribute, inject, output } from '@angular/core';
import { faCheck, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { TaskResponse } from '../../models/response/task-response';
import { TaskService } from '../../services/ManagerTime/task.service';
import { CommonTaskRequest, PauseTaskRequest } from '../../models/request/task-request';

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrl: './table-result.component.css'
})
export class TableResultComponent {

  @Input({ transform: booleanAttribute, required: true }) getCompleted !: boolean;
  @Input({ required: true }) data : TaskResponse[] = []
  @Input({required: false}) message !: string;

  @Output() taskPlayed = new EventEmitter();
  @Output() taskCompleted = new EventEmitter();

  faPlay = faPlay;
  faCheck = faCheck;
  faPause = faPause;


  time_elapsed: number = 0;

  constructor() {}

  changeStatusTask(model:TaskResponse): void {
    const request: PauseTaskRequest = {
      env_id: model.env_id,
      task_id: model.task_id,
      times: 0,
      paused: !model.paused
    }
    this.taskPlayed.emit(request);
  }

  completeTask(env_id: number, task_id: number): void {

    const request : CommonTaskRequest = {
      env_id: env_id,
      task_id: task_id
    };

    this.taskCompleted.emit(request);
  }
}
