const { Pool } = requiere('pg');

const pool = new Pool({
    user: process.env.DB_POSTGRES_USER,
    host:process.env.DB_POSTGRES_HOST,
    database: process.env.DB_POSTGRES_DATABASE,
    password:process.env.DB_POSTGRES_PASSWORD,
    port: DB_POSTGRES_PORT
});

const repository = {
    environment : {
        getEnvironments: async() => {
            var result = await pool.query('select * from environments where deleted = FALSE;')
            return result.rows;
        },
        addEnvironment: async (name) => {
            var result = await pool.query('INSERT INTO environment (environment_name) VALUES ($1) RETURNING *;', [name])
            return result.rows;
        },
        deleteEnvironment: async(id) => {
            await pool.query('DELETE FROM environments WHERE environment_id = $1;', [id]);
        }
    },
    tasks: {
        getTasks: async(completed) => {
            var result = await pool.query('select * from tasks where deleted = FALSE and completed = $1;', [completed])
            return result.rows;
        },
        addTask: async(id, description, break_time) =>{
            var result = pool.query('INSERT INTO tasks (task_id, task_description, break) VALUES($1, $2, $3) RETURNING *;', [id, description, break_time])            
        },
        completeTask: async(id) => {
            await pool.query('UPDATE tasks SET completed = TRUE, end_date = CURRENT_TIMESTAMP WHERE task_id = $1;', [id]);
        },
        changeStatusTask: async(id, status) =>{
            await pool.query('UPDATE tasks SET actived = $2 WHERE task_id = $1;', [id, status]);
        }
    }
};

module.exports = repository;


