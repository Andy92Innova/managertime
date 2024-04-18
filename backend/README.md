
# ManagerTime App [Backend]

ManagerTime help you to handle your time doing any task. It mean, you can do anything freedom and knowing in the end of the day how many time do you invest doing your activities.

This project was built and separeted in two apps [backend] y [frontend].

The backend project contains all the necessary apis. 

## Tools

This backend was built using the following packages

`Node JS`  ^20.11.1

`dotenv` ^16.4.5

`express`^4.19.2

`pg` ^8.11.5

`docker`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT`

`NODE_ENV`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_DB`

`POSTGRES_HOST`

`POSTGRES_PORT`

`POSTGRES_REJECTUNAUTHORIZED`

`POSTGRES_DIALECT`

`SECRET_KEY_ENCRYPT`

## Dockerfile

The dockerfile use *node:20.12.2-alpine3.19* image and expose the port 5001 to use the app, also, run the container using *node app.js* command.

## Features

- Add environments to work
- Add task by environments
- Pause your activities without worries and have and total time invested in them.
- Manage your time appropriately

