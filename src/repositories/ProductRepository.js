const knex = require("../database/knex")

class ProductRepository {
  async create({ name, description, price, image, category_id, user_id }) {
    const [ id ] = await knex('products').insert({
      name,
      description,
      price,
      image,
      category_id,
      user_id
    })
    return {
      id,
      name,
      description,
      price,
      image,
      category_id,
      user_id
    }
  }

  async findAll() {
    return await knex("products").orderBy("name")
  }
  async findAllWithFavorite(search, user_id) {
    return await knex.select([
                        "products.*",
                        "favorites.id as favorite"
                      ])
                      .from("products")
                      .leftJoin("favorites", function() {
                        this
                          .on("products.id", "=", "favorites.product_id")
                          .onIn("favorites.user_id", [ user_id ] )
                      })
                      .leftJoin("product_items", function() {
                        this
                          .on("products.id", "=", "product_items.product_id")
                      })
                      .whereLike("products.name",`%${search}%`)
                      .orWhereLike("product_items.name",`%${search}%`)
                      .orderBy([
                        "products.id",
                        "products.name"
                      ])
                      
  }

  async findByName(name) {
    const product = await knex("products").whereLike("name", `%${name}%`).orderBy("name")
    return product
  }

  async findById(product_id) {
    const product = await knex("products").where({ id: product_id }).first()
    return product
  }

  async update(product, product_id) {
    await knex("products").update(product).where({ id: product_id })
  }

  async delete(product_id) {
    await knex("products").where({ id: product_id }).delete()
  }
}

module.exports = ProductRepository