-- functions for ManagerTime

-- ## ENVIRONMENTS
drop function if exists getEnvironments;

create or replace function getEnvironments(par_user_id int)
returns table (
	env_id int,
	env_name varchar(20), 
	created_date timestamp, 
	deleted boolean
)
as $$
#variable_conflict use_column
begin 
	return query select 
		e.environment_id,
		e.environment_name,
		e.created_date,
		e.deleted
	FROM Environments e 
	inner join users_environments ue on e.environment_id = ue.environment_id
	where e.deleted = false
	and ue.deleted = false
	and ue.user_id = par_user_id;
end;
$$
language plpgsql;


drop function if exists envExistAndBelongUser;

create or replace function envExistAndBelongUser(par_user_id int, par_env_id int, par_env_name varchar(20) default '')
returns boolean as $$
declare belong boolean;
begin
	belong := case when exists(
		select 1
		FROM environments e 
		inner join users_environments ue on e.environment_id = ue.environment_id
		where e.deleted = false
		and ue.deleted = false
		and ue.user_id = par_user_id 
		and (e.environment_id = par_env_id or upper(e.environment_name) = upper(par_env_name))
		)
		then true else false 
		end;
	
	return belong;
end;
$$
language plpgsql;


--# ADD ENVIRONMENT
drop function if exists addEnvironment;

create or replace  function addEnvironment(par_user_id int, par_env_name varchar(20)) 
returns table (was_inserted boolean, message varchar(100)) as $$
declare was_inserted boolean; message varchar(100); env_id_generated int;
begin 

	was_inserted := true;
	message := '';
	
	if envExistAndBelongUser(par_user_id,0, par_env_name) then
		was_inserted := false;
		message := 'You can not insert the same environment';
	else 
		insert into environments(environment_name) 
		values(UPPER(par_env_name))
		returning environment_id into env_id_generated;
		
		insert into users_environments(environment_id, user_id)
		values(env_id_generated, par_user_id);
	
	
		message := 'The environment ' || par_env_name || ' was inserted';
	end if;

	return query select was_inserted, message;
end;
$$
language plpgsql;


--# DELETE OR UPDATE ENVIRONMENT
drop function if exists deleteEnvironment;

create or replace function deleteEnvironment(par_user_id int, par_env_id int)
returns table (was_deleted boolean, message varchar(100)) as 
$$
#variable_conflict use_column
declare
	env_name varchar(20);
	total_tasks int;
	has_task_active boolean;
	message varchar(100);
begin
	
	if envExistAndBelongUser(par_user_id,par_env_id) then
		select 
			e.environment_name,
			count(t.task_id)
		into 
			env_name,
			total_tasks 
		from environments e 
		inner join environments_tasks et on et.environment_id = e.environment_id
		inner join taskss t on t.task_id = et.task_id
		where e.environment_id = par_env_id
		and t.deleted = false
		group by e.environment_name;
		
		if total_tasks > 0 then 
			has_task_active := true;
			message = 'You can not delete the environment, because it has taskss active';
		else 
			has_task_active := false;
			message := 'environment ' || env_name || ' deleted';
			
			update Environments
			set deleted = true 
			where environment_id = par_env_id;
		
		end if;
	else
		has_task_active := false;
		message = 'Operation not allowed';
	end if;
	 
	return query select not has_task_active, message;
end;
$$
language plpgsql;


/*
drop function if exists finishDayEnvironment;

create or replace function finishDayEnvironment(par_user_id int, par_env_id int)
returns table (was_finished boolean, message varchar(100)) as 
$$
#variable_conflict use_column
declare 
	was_finished boolean;
	message varchar(100);
begin
	
	if envExistAndBelongUser(par_user_id,par_env_id) then
		UPDATE Environments_Days 
			SET	finished_date = TRUE 
		WHERE environment_id = par_env_id;
		
		was_finished := true;
		message := 'Environment was finished';
	else 
		was_finished := false;
		message := 'Operation not allowed';
	end if;
	
	return query select was_finished, message;
end;
$$
language plpgsql;

*/

-- ## TASK

--# ADD TASK

drop function if exists addTask;

create or replace function addTask(
	par_user_id int,
	par_env_id int, 
	par_task_name VARCHAR(20), 
	par_description varchar(300), 
	par_break_time int)
returns table (was_inserted boolean, message varchar(100)) as $$
#variable_conflict use_column
declare 
	was_inserted boolean; 
	message varchar(100);
	p_task_id int default 0;
begin
	
	was_inserted := true;
	message := '';

	if envExistAndBelongUser(par_user_id, par_env_id) then
		
		select 
			t.task_id
		into p_task_id
		from taskss t
		inner join environments_tasks et on et.task_id = t.task_id
		inner join environments e on e.environment_id = et.environment_id
		where upper(t.task_name) = upper(par_task_name) 
		and e.environment_id = par_env_id
		and t.deleted = false
		and et.deleted = false;
	
	
		if p_task_id != 0 then
			was_inserted := false;
			message := 'The task already exist in the environment. You can not insert the same task.';
		else
			
			insert into taskss (task_name, task_description) 
			VALUES(UPPER(par_task_name), par_description)
			returning task_id into p_task_id;
			
			insert into environments_tasks(environment_id, task_id, break_time)
			values(par_env_id, p_task_id, par_break_time);
				
			message := 'The task ' || Upper(par_task_name) || ' was inserted';
		end if;
	else
		was_inserted := false;
		message := 'Operation not allowed';
	end if;
	
	return query select was_inserted, message;
end;
$$
language plpgsql;

--# PAUSE AND INCREASE TIME TO ENVIRONMENT

drop function if exists pauseTask;

create or replace function pauseTask(
	par_user_id int,
	par_env_id int, 
	par_task_id int, 
	par_times int, 
	par_is_paused boolean)
returns table (
	env_id int,
	env_name varchar(20),
    task_id int,
    task_name varchar(20),
    task_description varchar(300),
    start_date timestamp,
    break_time int,
    paused boolean,
    completed boolean,
    times int,
    end_date timestamp
) as $$
#variable_conflict use_column
begin 
	
	if envExistAndBelongUser(par_user_id, par_env_id) then	
		update environments_tasks 
			set times = (case when par_is_paused = true then par_times else times + par_times end), 
				paused = par_is_paused 
		where deleted = false 
		and task_id = par_task_id
		and environment_id = par_env_id;
	
		insert into environments_tasks_logs(environment_id,task_id,paused,completed,times)
		values(par_env_id, par_task_id, par_is_paused,false, par_times);
		
		return query 
		select 
			e.environment_id,
			e.environment_name,
			t.task_id,
			t.task_name,
			t.task_description,
			et.start_date,
			et.break_time,
			et.paused,
			et.completed,
			et.times,
			et.end_date
		from taskss t 
		inner join environments_tasks et on t.task_id = et.task_id 
		inner join environments e on e.environment_id = et.environment_id
		where t.task_id = par_task_id
		and e.environment_id = par_env_id;
	end if;
end;
$$
language plpgsql;

--# SELECT taskss 

drop function if exists getTasks;

create or replace function getTasks(par_user_id int,par_is_completed boolean)
returns table (
	env_id int,
	env_name varchar(20),
    task_id int,
    task_name varchar(20),
    task_description varchar(300),
    start_date timestamp,
    break_time int,
    paused boolean,
    completed boolean,
    times int,
    end_date timestamp
) as 
$$
begin
	return query
	select
		e.environment_id,
		e.environment_name,
		t.task_id,
		t.task_name,
		t.task_description,
		et.start_date,
		et.break_time,
		et.paused,
		et.completed,
		et.times,
		et.end_date
	from taskss t
	inner join environments_tasks et on et.task_id = t.task_id
	inner join environments e on e.environment_id = et.environment_id
	inner join users_environments ue on ue.environment_id = e.environment_id and ue.user_id = par_user_id
	where t.deleted = false 
	and et.deleted = false
	and et.completed = par_is_completed;
end;
$$
language plpgsql;

drop function if exists getTask;

create or replace function getTask(par_user_id int, par_env_id int, par_task_id int)
returns table (
	env_id int,
	env_name varchar(20),
    task_id int,
    task_name varchar(20),
    task_description varchar(300),
    start_date timestamp,
    break_time int,
    paused boolean,
    completed boolean,
    times int,
    end_date timestamp
) as 
$$
begin
	return query
	select
		e.environment_id,
		e.environment_name,
		t.task_id,
		t.task_name,
		t.task_description,
		et.start_date,
		et.break_time,
		et.paused,
		et.completed,
		et.times,
		et.end_date
	from taskss t
	inner join environments_tasks et on et.task_id = t.task_id
	inner join environments e on e.environment_id = et.environment_id
	inner join users_environments ue on ue.environment_id = e.environment_id and ue.user_id = par_user_id
	where
	t.deleted = false
	and et.deleted = false
	and t.task_id = par_task_id
	and e.environment_id = par_env_id;
end;
$$
language plpgsql;


drop function if exists completeTask;

create or replace function completeTask(par_user_id int, par_env_id int, par_task_id int)
returns table( 
	env_name varchar(20),
    task_id int,
    task_name varchar(20),
    task_description varchar(300),
    start_date timestamp,
    break_time int,
    paused boolean,
    completed boolean,
    times int,
    end_date timestamp
) as $$
#variable_conflict use_column
begin
	if envExistAndBelongUser(par_user_id, par_env_id) then	
	
		UPDATE environments_tasks 
			SET completed = TRUE, 
				end_date = CURRENT_TIMESTAMP 
		WHERE task_id = par_task_id;
	
		return query select
			e.environment_name,
			t.task_id,
			t.task_name,
			t.task_description,
			et.start_date,
			et.break_time,
			et.paused,
			et.completed,
			et.times,
			et.end_date
		from taskss t
		inner join environments_tasks et on et.task_id = t.task_id
		inner join environments e on e.environment_id = et.environment_id
		where t.task_id = par_task_id
		and e.environment_id = par_env_id;
	end if;
end;
$$
language plpgsql;


--## SECURITY

drop function if exists getUser;

create or replace function getUser(par_user_email varchar(100))
returns table (
	user_id int,
	user_name varchar(100),
	user_email varchar(100),
	hash_password text,
	agree_terms boolean
) 
as $$
begin
	return query select 
		e.user_id,
		e.user_name,
		e.user_email,
		e.hash_password,
		e.agree_terms
	from users e
	where e.actived = true
	and e.user_email = par_user_email;
end;
$$
language plpgsql;


drop function if exists addUser;

create or replace function addUser(
	par_user_name varchar(100), 
	par_user_email varchar(100), 
	par_user_password text, 
	par_agree_terms boolean)
returns table (
	was_inserted boolean,
	message varchar(100)
) as $$
begin 
	insert into users(user_name, user_email, hash_password, agree_terms)
	values(par_user_name, par_user_email, par_user_password, par_agree_terms);

	was_inserted := true;
	message := 'User added';

	return query select was_inserted, message;
end; 
$$
language plpgsql


