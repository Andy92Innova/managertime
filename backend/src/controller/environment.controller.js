const environmentService = require('../services/environment.service');

const getEnvironments = async(req,res) => res.send(await environmentService.getEnvironments());

const addEnvironment = async(req, res) => {
    const { name } = req.body;
    return res.send(await environmentService.addEnvironment(name));
};

const deleteEnvironment = async(req, res) => {
    const id = parseInt(req.params.id);
    await environmentService.deleteEnvironment(id);
};

module.exports = { getEnvironments, addEnvironment, deleteEnvironment };