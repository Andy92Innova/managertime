const repository = require('../persistence/pgRepository');

const taskService = {
    getTasks: async() => await repository.tasks.getTasks(),
    addTask: async(id, description, break_time) => await repository.tasks.addTask(id, description, break_time),
    completeTask: async(id) => await repository.tasks.completeTask(id),
    changeStatusTask: async(id, status) => await repository.tasks.changeStatusTask(id, status)
};

module.exports = taskService;