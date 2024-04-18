# ManagerTime App [Frontend]

ManagerTime help you to handle your time doing any task. It mean, you can do anything freedom and knowing in the end of the day how many time do you invest doing your activities.

This project was built and separeted in two apps [backend] y [frontend].

The backend project contains all the necessary apis. 

## Development server

You can use either `ng build` or `npm run start` to run the server.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

You can use either `ng build` or `npm run build` to build the artifacts.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Environment

Make sure that configure these variables in your envionment file.

`API_MANAGER_TIME`: URL of the api server eg `http://localhost:5000/api`

`API_ENV`: '/env' => suffix part of the endpoint for api rest of `environment`

`API_TASK`: '/task' = suffix part of the endpoint for api rest of `task`

`API_LOGIN`: '/security/login' = suffix part of the endpoint for api rest of `security`


### Environment files

Make sure that domains' the port [5000] of the api service is the correct port, change the port according the environment do you want to run.

For make easier for you, you cant use `--configuration` in `ng serve` property to choise the correct environment.

To use *the environment.production.ts* file
```bash
ng serve --configuration production
```
To use *the environment* file
```bash
ng serve
```

## Dockerfile

The dockerfile use *node:20.12.2-alpine3.19* image and expose the port 4200 to use the app, also, run the container using *npm run startdocker* command. You can see the startdocker instruction in *package.json*.


