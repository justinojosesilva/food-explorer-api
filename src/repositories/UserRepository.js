const knex = require('../database/knex')

class UserRepository {
  async create({ name, email, password }) {
    const [ id ] = await knex('users').insert({
      name,
      email,
      password
    })
    return id
  }

  async findByEmail(email) {
    const user = await knex("users").where({ email }).first()
    return user
  }

  async findById(user_id) {
    const user = await knex("users").where({ id: user_id }).first()
    return user
  }

  async update({name, email, password}, id) {
    await knex("users").update({name, email, password}).where({ id })
  }
}

module.exports = UserRepository