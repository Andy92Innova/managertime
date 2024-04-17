export interface EnvironmentModelResponse {
  env_id: number;
  env_name: string;
  created_date: Date;
  deleted: boolean;
}

export interface DeleteEnvironmentModelResponse {
  was_deleted: boolean;
  message: string;
}

export interface FinishDayResponse {
  env_day_id: number;
  env_id: number;
  control_date: Date,
  times: number,
  finished_date: number
}
