const knex = require("../database/knex")

class PaymentRepository {
  async create({ user_id, order_id, type_payment, pix_code, number_credit, validate_credit, cvc_credit }) {
    const [ id ] = await knex('payments').insert({
      user_id, order_id, type_payment, pix_code, number_credit, validate_credit, cvc_credit
    })

    return {
      id, user_id, order_id, type_payment, pix_code, number_credit, validate_credit, cvc_credit
    }
  }

  async findAll() {
    return await knex("payments").orderBy("status")
  }

  async findByUserId(user_id) {
    const payments = await knex("payments").where({ user_id }).orderBy("status")
    return payments
  }

  async findById(payment_id) {
    const payment = await knex("payments").where({ id: payment_id }).first()
    return payment
  }

  async update(payment, payment_id) {
    await knex("payments").update(payment).where({ id: payment_id })
  }

  async delete(payment_id) {
    await knex("payments").where({ id: payment_id }).delete()
  }
}

module.exports = PaymentRepository