const AppError = require("../../utils/AppError")

class OrderPatchStatusService {

  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute({ status, order_id }) {
    const order = await this.orderRepository.findById(order_id) 
    if(!order) {
      throw new AppError("Pedido não encontrado.")
    }
    order.status = status ?? order.status
    await this.orderRepository.update(order, order.id)
  }

}

module.exports= OrderPatchStatusService

