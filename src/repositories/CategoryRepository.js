const knex = require("../database/knex")

class CategoryRepository {
  async create({ name, user_id }) {
    const [ id ] = await knex('categories').insert({
      name,
      user_id
    })
    return id
  }

  async findAll() {
    return await knex("categories").orderBy("id")
  }

  async findByName(name) {
    const category = await knex("categories").whereLike("name", `%${name}%`).orderBy("name")
    return category
  }

  async findById(category_id) {
    const category = await knex("categories").where({ id: category_id }).first()
    return category
  }

  async update(category, category_id) {
    await knex("categories").update(category).where({ id: category_id })
  }

  async delete(category_id) {
    await knex("categories").where({ id: category_id }).delete()
  }
}

module.exports = CategoryRepository