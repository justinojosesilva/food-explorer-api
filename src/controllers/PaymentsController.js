const PaymentRepository = require("../repositories/PaymentRepository")
const OrderRepository = require("../repositories/OrderRepository")
const PaymentCreateService = require("../services/Payments/PaymentCreateService")
const PaymentDeleteService = require("../services/Payments/PaymentDeleteService")
const PaymentIndexService = require("../services/Payments/PaymentIndexService")
const PaymentShowService = require("../services/Payments/PaymentShowService")
const PaymentUpdateService = require("../services/Payments/PaymentUpdateService")

class PaymentsController {
  async index(request, response) {
    const paymentRepository = new PaymentRepository()
    const paymentIndexService = new PaymentIndexService(paymentRepository)
    const payments = await paymentIndexService.execute()
    return response.status(200).json(payments)
  }

  async show(request, response) {
    const { payment_id } = request.params 
    const paymentRepository = new PaymentRepository()
    const paymentShowService = new PaymentShowService(paymentRepository)
    const payment = await paymentShowService.execute({ payment_id })
    return response.status(200).json(payment)
  }

  async create(request, response) {
    const { order_id, type_payment, pix_code, number_credit, validate_credit, cvc_credit } = request.body
    const user_id = request.user.id 
    const paymentRepository = new PaymentRepository()
    const orderRepository = new OrderRepository()
    const paymentCreateService = new PaymentCreateService(paymentRepository, orderRepository)
    const payment = await paymentCreateService.execute({ 
      order_id, 
      type_payment, 
      pix_code, 
      number_credit, 
      validate_credit, 
      cvc_credit, 
      user_id 
    })
    return response.status(201).json(payment)
  }

  async update(request, response) {
    const { order_id, type_payment, status, pix_code, number_credit, validate_credit, cvc_credit } = request.body
    const { payment_id } = request.params 
    const user_id = request.user.id
    const paymentRepository = new PaymentRepository()
    const orderRepository = new OrderRepository()
    const paymentUpdateService = new PaymentUpdateService(paymentRepository, orderRepository)
    const payment = await paymentUpdateService.execute({ 
      order_id, 
      type_payment, 
      pix_code, 
      number_credit, 
      validate_credit, 
      cvc_credit, 
      payment_id,
      status,
      user_id 
    })
    return response.status(200).json(payment)
  }

  async delete(request, response) {
    const { payment_id } = request.params
    const paymentRepository = new PaymentRepository()
    const paymentDeleteService = new PaymentDeleteService(paymentRepository)
    await paymentDeleteService.execute({ payment_id })
    return response.status(200).json()
  }

}

module.exports = PaymentsController