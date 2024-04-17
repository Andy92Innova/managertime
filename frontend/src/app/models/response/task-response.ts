
export interface TaskResponse{
  env_id:number;
  env_name:string;
  task_id:number;
  task_name:string;
  task_description:string;
  start_date:Date;
  times:number;
  break_time:number;
  end_date:Date;
  paused: boolean;
}
