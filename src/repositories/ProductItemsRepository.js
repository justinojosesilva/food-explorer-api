const knex = require("../database/knex")

class ProductItemsRepository {
  async create(productItems) {
    await knex('product_items').insert(productItems)
  }

  async findByProductId(product_id) {
    const productItems = await knex("product_items").where({ product_id })
    return productItems
  }

  async delete(product_id) {
    await knex("product_items").where({ product_id }).delete()
  }
}

module.exports = ProductItemsRepository