const AppError = require("../../utils/AppError")

class PaymentShowService {

  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute({ payment_id }) {
    const payment = await this.paymentRepository.findById(payment_id)
    if(!payment) {
      throw new AppError("Pagamento não encontrado.")
    }
    return payment
  }

}

module.exports = PaymentShowService