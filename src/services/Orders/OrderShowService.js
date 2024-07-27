const AppError = require("../../utils/AppError")

class OrderShowService {
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
    const products = await this.orderProductsRepository.findByOrderId(order_id)

    return {
      ...order,
      products
    }
  }
}

module.exports = OrderShowService