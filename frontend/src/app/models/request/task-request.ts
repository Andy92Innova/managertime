export interface CommonTaskRequest{
  env_id: number;
  task_id: number;
}

export interface AddTaskRequest extends CommonTaskRequest{
  task_name:string;
  description: string;
  break_time: number;
}

export interface PauseTaskRequest extends CommonTaskRequest{
  times:number;
  paused: boolean;
}
