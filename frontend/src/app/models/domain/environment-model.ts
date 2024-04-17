export class EnvironmentModel{
  environment_id !: number;
  environment_name !: string;
  created_date !: Date;
  deleted !: boolean;

  constructor(environmentName: string){
    this.environment_name = environmentName;
  }

  deleteEnvironment():void {
    this.deleted = true;
  }

}
