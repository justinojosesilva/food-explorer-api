const knex = require("../database/knex")

class OrderRepository {
  async create({ amount, user_id }) {
    const [ id ] = await knex('orders').insert({
      amount,
      user_id
    })

    return {
      id,
      amount,
      user_id
    }
  }

  async findAll() {
    return await knex      
    .select([
      "orders.id",
      "orders.amount",
      "orders.status",
      "orders.updated_at",
      "order_products.quantity",
      "order_products.product_id",
      "products.name"
    ])
    .from("orders")
    .innerJoin("order_products", function() {
      this.on("orders.id", "=", "order_products.order_id")
    })
    .innerJoin("products", function() {
      this.on("order_products.product_id", "=", "products.id")
    })
  }

  async findByUserId(user_id) {
    const order = await knex
      .select([
        "orders.id",
        "orders.amount",
        "orders.status",
        "orders.updated_at",
        "order_products.quantity",
        "order_products.product_id",
        "products.name"
      ])
      .from("orders")
      .innerJoin("order_products", function() {
        this.on("orders.id", "=", "order_products.order_id")
      })
      .innerJoin("products", function() {
        this.on("order_products.product_id", "=", "products.id")
      })
      .whereIn("orders.user_id", [user_id]).orderBy("status")
    return order
  }

  async findByUserIdAndStatusPending(user_id) {
    const order = await knex("orders")
                                .where({ user_id })
                                .andWhere({ status: "pending"})
                                .first()
    return order
  }

  async findById(order_id) {
    const order = await knex("orders").where({ id: order_id }).first()
    return order
  }

  async update(order, order_id) {
    await knex("orders").update(order).where({ id: order_id })
  }

  async delete(order_id) {
    await knex("orders").where({ id: order_id }).delete()
  }
}

module.exports = OrderRepository