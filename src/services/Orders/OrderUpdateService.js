const AppError = require("../../utils/AppError")

class OrderUpdateService {
  constructor(
    orderRepository,
    orderProductsRepository
  ) {
    this.orderRepository = orderRepository
    this.orderProductsRepository = orderProductsRepository
  }

  async execute({ status, amount, user_id, products, order_id }) {
    if( !products || products.length === 0) {
      throw new AppError("Pedido não tem produto")
    }

    const order =  await this.orderRepository.findById(order_id)

    if(!order) {
      throw new AppError("Pedido não encontrado.")
    }

    let totalAmount = 0
    products.map( product => {
      totalAmount = totalAmount + ( product.unit_price * product.quantity)
    })
    if (!amount || amount === 0 || amount !== totalAmount) {
      amount = totalAmount
    }

    order.status = status ?? order.status
    order.amount = amount ?? order.amount

    await this.orderRepository.update(order, order.id)

    await this.orderProductsRepository.delete(order.id)

    const orderProductsInsert = products.map( product => {
      return {
        order_id: order.id,
        product_id: product.product_id,
        quantity: product.quantity,
        unit_price: product.unit_price
      }
    })

    await this.orderProductsRepository.create(orderProductsInsert)

    return {
      ...order,
      products: orderProductsInsert
    }
  }
}

module.exports = OrderUpdateService