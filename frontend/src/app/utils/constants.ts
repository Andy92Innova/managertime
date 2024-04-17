export enum ENVIRONMENT_SUFIX_API {
  GET_ENVIRONMENTS = '/getEnvironments',
  ADD_ENVIRONMENT = '/addEnvironment',
  DEL_ENVIRONMENT = '/deleteEnvironment',
  FINISH_DAY_ENV = '/finishDayEnvironment'
}

export enum TASK_SUFIX_API{
  GET_TASKS = '/getTasks',
  GET_TASK = '/getTask',
  ADD_TASK = '/addTask',
  COMPLET_TASK = '/completeTask',
  PAUSE_TASK = '/pauseTask'
}

export enum SECURITY_SUFIX_API{
  LOGIN = '/security/login',
  REGISTER = '/security/register',
  GETUSER = '/security/getUser',
  GETUSERP = '/security/getUserP'
}

export enum ROUTES{
  ROUTE_REGISTER = '/security/register',
  ROUTE_LOGIN = '/security/login',
  ROUTE_HOME = '/main/home'
}
