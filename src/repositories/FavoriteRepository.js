const knex = require("../database/knex")

class FavoriteRepository {

  async create(favorite) {
    await knex('favorites').insert(favorite)
  }

  async findAll() {
    const favorites = 
    await knex
        .select([
          "favorites.id",
          "products.id as product_id",
          "products.name",
          "products.description",
          "products.image",
          "products.price",
          "products.category_id"
        ])
        .from("favorites")
        .innerJoin("products", function() {
          this.on("favorites.product_id","=","products.id")
        })
        .groupBy([
          "favorites.id",
          "products.id",
          "products.name",
          "products.description",
          "products.image",
          "products.price",
          "products.category_id"
        ])
    return favorites
  }

  async findByUserIdAndProductId(user_id, product_id) {
    const favorite = await knex("favorites").where({ user_id }).andWhere({ product_id}).first()
    return favorite ? true : false
  }

  async findByUserI(user_id) {
    const favorites = 
      await knex
      .select([
        "favorites.id",
        "products.id as product_id",
        "products.name",
        "products.description",
        "products.image",
        "products.price",
        "products.category_id"
      ])
      .from("favorites")
      .innerJoin("products", function() {
        this.on("favorites.product_id","=","products.id")
      })
      .whereIn("favorites.user_id", [ user_id ])
    return favorites
  }

  async delete(user_id, product_id) {
    await knex("favorites").where({ user_id}).andWhere({ product_id}).delete()
  }

}

module.exports = FavoriteRepository