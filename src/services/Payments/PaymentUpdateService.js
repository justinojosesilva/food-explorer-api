const AppError = require("../../utils/AppError")

class PaymentUpdateService {

  constructor(
    paymentRepository,
    orderRepository,
  ) {
    this.paymentRepository = paymentRepository
    this.orderRepository = orderRepository
  }

  async execute({ user_id, order_id, type_payment, status, code_pix, number_credit, validate_credit, cvc_credit, payment_id }) {
    const order = await this.orderRepository.findById(order_id)
    if(!order) {
      throw new AppErro("Não existe pedido para esse pagamento.")
    }

    if( order.user_id !== user_id) {
      throw new AppError("Esse pagamento não é desse usuário.")
    }

    const payment = await this.paymentRepository.findById(payment_id)

    if(!payment) {
      throw new AppError("Pagamento não encontrado.")
    }
    
    if(payment.id !== Number(payment_id)) {
      throw new AppError("Pagamento não confere com o encontrado.")
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

    payment.type_payment = type_payment ?? payment.type_payment
    payment.status = status ?? payment.status
    payment.code_pix = code_pix ?? payment.code_pix
    payment.number_credit = number_credit ?? payment.number_credit
    payment.validate_credit = validate_credit ?? payment.validate_credit
    payment.cvc_credit = cvc_credit ?? payment.cvc_credit

    await this.paymentRepository.update(payment, payment.id)
    
    return payment
  }

}

module.exports = PaymentUpdateService