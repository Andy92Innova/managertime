const repository = require('../persistence/pgRepository');

const environmentService = {
    getEnvironments: async() => await repository.environment.getEnvironments(),
    addEnvironment: async(name) => await repository.environment.addEnvironment(name),
    deleteEnvironment: async(id) => await repository.environment.deleteEnvironment(id)
};

module.exports = environmentService;
