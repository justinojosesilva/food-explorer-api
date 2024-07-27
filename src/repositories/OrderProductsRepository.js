const knex = require("../database/knex")

class OrderProductsRepository {
  async create(orderProducts) {
    await knex('order_products').insert(orderProducts)
  }

  async findByOrderId(order_id) {
    const orderProducts = await knex.select([
                                    "order_products.id",
                                    "order_products.quantity",
                                    "products.id as product_id",
                                    "products.name",
                                    "products.description",
                                    "products.image",
                                    "products.price",
                                    "products.category_id",
                                    "products.user_id",

                                  ])
                                  .from("order_products")
                                  .innerJoin("products", function(){
                                    this.on("order_products.product_id", "=", "products.id")
                                  })
                                  .where({ order_id })
    return orderProducts
  }

  async delete(order_id) {
    await knex("order_products").where({ order_id }).delete()
  }
}

module.exports = OrderProductsRepository