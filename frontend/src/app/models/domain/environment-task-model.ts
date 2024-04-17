export class EnvironmentTaskModel {
  environment_task_id !: number;
  environment_id !: number;
  task_id !: string;
  completed !: boolean;
  end_date !: Date;

  constructor(
    environment_task_id: number,
    environment_id: number,
    task_id: string,
    completed: boolean,
    end_date: Date
  ) {
    this.environment_task_id = environment_task_id;
    this.environment_id = environment_id;
    this.task_id = task_id;
    this.completed = completed;
    this.end_date = end_date;
  }

  completeTask() {
    this.completed = true;
  }

}
