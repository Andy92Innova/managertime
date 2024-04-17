const repository = require('../persistence/pgRepository');

const taskService = {
    getTasks: async(completed) => await repository.tasks.getTasks(completed),
    getTask: async(env_id,task_id) => await repository.tasks.getTask(env_id,task_id),
    addTask: async(env_id, task_name, description, break_time) => await repository.tasks.addTask(env_id, task_name, description, break_time),
    completeTask: async(env_id, task_id) => await repository.tasks.completeTask(env_id, task_id),
    pauseTask: async(env_id, task_id, times, paused) => await repository.tasks.pauseTask(env_id,task_id, times, paused),
    setUserLogin: (id) => repository.security.setUserId(id)
};

module.exports = taskService;