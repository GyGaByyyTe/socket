require('dotenv').config()
const socketApi = require('./socket');

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
})

const transform = (model) => ({ id: model.id, ...JSON.parse(model.content) });

const getSchedules = (request, response, next) => {
  pool.query('SELECT * FROM schedules ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows.map(transform))
  })
}

const getScheduleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM schedules WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    const schedule = results.rows[0];
    const returned = transform(schedule);
    response.status(200).json(returned)
  })
}

const createSchedule = async (request, response) => {
  return await pool.query('INSERT INTO schedules (content) VALUES ($1) RETURNING *', [request.body])
      .then(res => {
        response.status(201).send(`Schedule added with ID: ${res.rows[0].id}`);
        socketApi.io.sockets.emit("updated", res.rows[0].id);
        return res.rows[0].id
      })
      .catch(err => console.error('Error executing query', err.stack))
}

const updateSchedule = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
      'UPDATE schedules SET content = $1 WHERE id = $2',
      [request.body, id],
      (error, results) => {
        if (error) {
          throw error
        }
        socketApi.io.sockets.emit("updated", id);
        response.status(200).send(`Schedule modified with ID: ${id}`)
      }
  )
}

const deleteSchedule = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM schedules WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Schedule deleted with ID: ${id}`)
  })
}

module.exports = {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
}