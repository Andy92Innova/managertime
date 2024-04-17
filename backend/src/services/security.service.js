const repository = require('../persistence/pgRepository');

const securityService = {
    addUser: async(user_name,user_email, user_pass, agree_terms) => repository.security.addUser(user_name, user_email, user_pass, agree_terms),
    getUser: async (user_name) => repository.security.getUser(user_name)
}

module.exports = securityService;