const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    ssl: false,
    // ssl: { 
    //     rejectUnauthorized: !Boolean(process.env.DB_POSTGRES_REJECTUNAUTHORIZED),
    // },
    dialect: process.env.POSTGRES_DIALECT
});

let user_id;

const repository = {

    security:{
        addUser: async(name, email, pass, agree_terms) => {
            var result = await pool.query('select * from addUser($1,$2,$3,$4);', [name, email, pass, agree_terms]);
            return result.rows[0];
        },
        getUser: async(user_name) => {
            var result = await pool.query('select * from getUser($1);', [user_name]);
            
            return result.rows[0];
        },
        setUserId: (id)=>{
            user_id = id;
        }
    },
    environment: {
        getEnvironments: async () => {
            var result = await pool.query('SELECT * FROM getEnvironments($1);',[user_id])
            return result.rows;
        },
        addEnvironment: async (name) => {
            var result = await pool.query('select * from addEnvironment($1,$2);',[user_id, name])
            return result.rows[0];
        },
        deleteEnvironment: async (id) => {
            var result = await pool.query('select * from deleteEnvironment($1,$2);', [user_id, id]);
            return result.rows[0];
        },
        finishDay: async(env_id) =>{
            var result = await pool.query('select * from finishDayEnvironment($1,$2)', [user_id, env_id]);
            return result.rows[0];
        }
    },
    tasks: {
        getTasks: async (completed) => {
            var result = await pool.query('SELECT * FROM getTasks($1, $2);', [user_id, completed]);
            return result.rows;
        },
        getTask: async (env_id, task_id) => {
            var result = await pool.query('SELECT * FROM getTask($1, $2 ,$3);', [user_id, env_id, task_id]);
            return result.rows[0];
        },
        addTask: async (env_id, task_name, description, break_time) => {
            var result = await pool.query('select * from addTask($1, $2, $3, $4, $5);', [user_id, env_id, task_name, description, break_time]);
            return result.rows[0];
        },
        completeTask: async (env_id, task_id) => {
            var result = await pool.query('select * from completeTask($1,$2,$3)', [user_id, env_id, task_id]);
            return result.rows[0];
        },
        pauseTask: async (env_id, task_id, times, paused) => {
            var result = await pool.query('select * from pauseTask($1, $2, $3, $4, $5);', [user_id, env_id, task_id, times, paused]);
            return result.rows[0];
        }
    }
};

module.exports = repository;


