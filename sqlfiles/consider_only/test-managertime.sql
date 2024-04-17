select envBelongUser(1,1);
select * from addEnvironment(1,'test-1');
select * from addEnvironment(1,'test-2');
select * from deleteEnvironment(1,2);
select * from addTask(1,2, 'task-1', 'test',120);
select * from pauseTask(1,2,1,10, true);
select * from completeTask(1,2,1);
select * from getUser('andydar20@gmail.com');

select * from users;
select * from users_environments ue ;
select * from environments e ;
select * from environments_tasks et;
select * from taskss ;
select * from environments_days ed  ;