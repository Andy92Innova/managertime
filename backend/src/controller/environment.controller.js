const environmentService = require('../services/environment.service');

const getEnvironments = async(req,res) => {
    const { id } = req.user;
    environmentService.setUserLogin(id);
    return res.send(await environmentService.getEnvironments());
}

const addEnvironment = async(req, res) => {
    const {name } = req.body;
    const { id } = req.user;
    
    environmentService.setUserLogin(id);
    return res.send(await environmentService.addEnvironment(name));
};

const deleteEnvironment = async(req, res) => {
    const {env_id} = req.query;
    const { id } = req.user;
    environmentService.setUserLogin(id);
    return res.send(await environmentService.deleteEnvironment(env_id));
};

const finishDayEnvironment = async(req,res) => {
    const { env_id } = req.query;
    const { id } = req.user;
    environmentService.setUserLogin(id);
    return res.send(await environmentService.finishDayEnvironment(env_id));
}

module.exports = { getEnvironments, addEnvironment, deleteEnvironment, finishDayEnvironment };