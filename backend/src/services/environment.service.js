const repository = require('../persistence/pgRepository');

const environmentService = {
    getEnvironments: async() => await repository.environment.getEnvironments(),
    addEnvironment: async(name) => await repository.environment.addEnvironment(name),
    deleteEnvironment: async(env_id) => await repository.environment.deleteEnvironment(env_id),
    finishDayEnvironment: async(env_id) => await repository.environment.finishDay(env_id),
    setUserLogin: (id) => repository.security.setUserId(id)
};

module.exports = environmentService;
