const taskService = require('../services/task.service');

const getTasks = async(req, res) => res.send(await taskService.getTasks());
const addTask = async(req, res) => {
    const { id, description, break_time } = req.body;
    return res.send(await taskService.addTask(id, description, break_time));
};


const completeTask = async(req, res) =>{
    const id = parseInt(req.params.id);
    await taskService.completeTask(id);
};

const changeStatusTask = async(req, res) => {
    const { id, status } = req.body;
    await taskService.changeStatusTask(id, status);
};

module.exports = { getTasks, addTask, completeTask, changeStatusTask };