class PaymentIndexService {

  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute() {
    return await this.paymentRepository.findAll()
  }

}

module.exports = PaymentIndexService