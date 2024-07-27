const AppError = require("../../utils/AppError")

class OrderCreateService {
  constructor(
    orderRepository,
    orderProductsRepository
  ) {
    this.orderRepository = orderRepository
    this.orderProductsRepository = orderProductsRepository
  }

  async execute({ amount, user_id, products }) {
    if( !products || products.length === 0) {
      throw new AppError("Pedido não tem produto")
    }

    let totalAmount = 0
    products.map( product => {
      totalAmount = totalAmount + ( product.unit_price * product.quantity)
    })
    if (!amount || amount === 0 || amount !== totalAmount) {
      amount = totalAmount
    }

    const order = await this.orderRepository.create({
      amount,
      user_id
    })

    
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

module.exports = OrderCreateService