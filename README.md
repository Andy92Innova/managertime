# ManagerTime App 
ManagerTime help you to handle your time doing any task. It mean, you can do anything freedom and knowing in the end of the day how many time do you invest doing your activities.

This project was built and separeted in two apps [backend] y [frontend].


## Run Locally

Clone the project

```bash
  git clone https://github.com/Andy92Innova/managertime
```

Go to the *project*, can be either [backend] or [frontend] directory

```bash
  cd [project]
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```

Start the client

```bash
  npm run start
```

## Build using docker compose

You can run the apps and the all the necessary services using docker compose. You can see the compose file to know the services.

if you want to run using docker, over the root directory run the following command

```bash
  dockerk compose up
```

## Sql files

You can find all the necessary files into *sqlfiles > consider_only* folder

## Healthcheck

You can find all the necessary files to check the health of the services into docker into *healthcheck* folder

## Tech Stack

**Client:** Angular, Bootstrap, Fontawesome

**Server:** Node, Express, bcrypt

**Database** PostgresSql

## Features

- Login using token
- Register new user
- Main page to control task over different environment do you have.
- Manage your time appropriately
