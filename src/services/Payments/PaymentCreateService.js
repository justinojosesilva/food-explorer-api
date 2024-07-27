const AppError = require("../../utils/AppError")

class PaymentCreateService {

  constructor(
    paymentRepository,
    orderRepository,
  ) {
    this.paymentRepository = paymentRepository
    this.orderRepository = orderRepository
  }

  async execute({ user_id, order_id, type_payment, pix_code, number_credit, validate_credit, cvc_credit }) {
    const order = await this.orderRepository.findById(order_id)
    if(!order) {
      throw new AppErro("Não existe pedido para esse pagamento.")
    }

    if( order.user_id !== user_id) {
      throw new AppError("Esse pagamento não é desse usuário.")
    }

    if( type_payment === 'pix' && (!pix_code || pix_code.length === 0) ) {
      throw new AppError("Código pix não informado.")
    }

    if( type_payment === 'credit') {
      if(!number_credit || !validate_credit || !cvc_credit ) {
        throw new AppError("Por gentileza, informar os dados do cartão.")
      }
      // TODO: Validar validade do cartão
    }

    const payment = await this.paymentRepository.create({
      user_id, order_id, type_payment, pix_code, number_credit, validate_credit, cvc_credit
    })

    order.status = 'preparing'
    await this.orderRepository.update(order, order_id)
    return payment
  }

}

module.exports = PaymentCreateService