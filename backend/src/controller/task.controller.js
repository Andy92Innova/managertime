const taskService = require('../services/task.service');

const getTasks = async (req, res) => {
    const { completed } = req.query

    const { id } = req.user;
    taskService.setUserLogin(id);

    return res.send(await taskService.getTasks(completed));
}

const getTask = async (req, res) => {
    const { env_id, task_id } = req.query

    const { id } = req.user;
    taskService.setUserLogin(id);

    return res.send(await taskService.getTask(env_id, task_id));
}

const addTask = async (req, res) => {
    const { env_id, task_name, description, break_time } = req.body;

    const { id } = req.user;
    taskService.setUserLogin(id);

    return res.send(await taskService.addTask(env_id, task_name, description, break_time));
};

const completeTask = async (req, res) => {
    const { env_id, task_id } = req.query;

    const { id } = req.user;
    taskService.setUserLogin(id);

    return res.send(await taskService.completeTask(env_id, task_id));
};

const pauseTask = async (req, res) => {
    const {env_id, task_id, times, paused } = req.body;

    const { id } = req.user;
    taskService.setUserLogin(id);

    return res.send(await taskService.pauseTask(env_id, task_id, times, paused));
};

module.exports = { getTasks, getTask, addTask, completeTask, pauseTask };