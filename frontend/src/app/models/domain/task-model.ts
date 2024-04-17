export class TaskModel {
  task_id !: string;
  task_description !: string;
  start_date !: Date;
  times !: number;
  break_time !: number;
  paused !: boolean;
  deleted !: boolean;

  constructor(
    taskId: string,
    taskDescripcion: string,
    times: number,
    breaks: number
  ) {
    this.task_id = taskId;
    this.task_description = taskDescripcion;
    this.times = times;
    this.break_time = breaks;
  }

  pauseTask(breaks: number) {
    this.paused = true;
    this.break_time = breaks;
  }

  deleteTask() {
    this.deleted = true;
  }


}
