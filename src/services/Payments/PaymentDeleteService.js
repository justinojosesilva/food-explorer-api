const AppError = require("../../utils/AppError")

class PaymentDeleteService {

  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute({ payment_id }) {
    const payment = await this.paymentRepository.findById(payment_id)
    if(!payment) {
      throw new AppError("Pagamento não encontrado.")
    }
    await this.paymentRepository.delete(payment.id)
  }

}

module.exports = PaymentDeleteService