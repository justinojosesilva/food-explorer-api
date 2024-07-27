const AppError = require("../../utils/AppError")

class OrderDeleteService {
  constructor(
    orderRepository,
    orderProductsRepository
  ) {
    this.orderRepository = orderRepository
    this.orderProductsRepository = orderProductsRepository
  }

  async execute({ order_id }) {
    const order = await this.orderRepository.findById(order_id)
    if(!order) {
      throw new AppError("Pedido não encontrado.")
    }
    await this.orderProductsRepository.delete(order_id)
    await this.orderRepository.delete(order_id)
  }
}

module.exports = OrderDeleteService