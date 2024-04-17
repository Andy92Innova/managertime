--create database managertime 
--owner=postgres;


drop table if exists Environments_Days;
drop table if exists Environments_Tasks;
drop table if exists Environments_Tasks_Logs;
drop table if exists Users_Environments;
drop table if exists Taskss;
drop table if exists Environments;
drop table if exists Users;

create table Users(
	user_id serial primary key,
	user_name varchar(100) not null,
	user_email varchar(100) not null,
	hash_password text not null,
	actived boolean not null default true,
	agree_terms boolean not null
);

create table Environments(
	environment_id serial primary key,
	environment_name varchar(20) not null,
	created_date timestamp not null default CURRENT_TIMESTAMP,
	deleted boolean not null default FALSE
);

create table Taskss(
	task_id serial not null primary key,
	task_name varchar(20) not null,
	task_description varchar(300) not null,
	deleted boolean not null default FALSE
);

create table Users_Environments(
	user_environment_id serial primary key,
	environment_id int not null,
	user_id int not null,
	deleted boolean not null default false,
	constraint environment_id_fkey foreign key (environment_id)
		references Environments(environment_id),
	constraint user_id_fkey foreign key (user_id)
		references Users(user_id)
);

create table Environments_Tasks(
	environment_task_id serial primary key,
	environment_id int not null,
	task_id int not null,
	start_date timestamp not null default CURRENT_TIMESTAMP ,
	break_time int NULL,
	paused boolean not null default true,
	completed boolean not null default false,
	times int not null default 0,
	end_date timestamp NULL,
	deleted boolean default false,
	constraint environment_id_fkey foreign key (environment_id)
		references Environments(environment_id),
	constraint task_id_fkey foreign key (task_id)
		references Taskss(task_id)
);

create table Environments_Tasks_Logs (
	environment_task_log_id serial primary key,
	environment_id int not null,
	task_id int not null,
	paused boolean not null,
	completed boolean not null,
	times int not null,
	date_history timestamp not null default current_timestamp,
	constraint environment_id_fkey foreign key (environment_id)
		references Environments(environment_id),
	constraint task_id_fkey foreign key (task_id)
	references Taskss(task_id)
);

