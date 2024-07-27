const OrderRepository = require('../repositories/OrderRepository')
const OrderProductsRepository = require('../repositories/OrderProductsRepository')
const ProductRepository = require('../repositories/ProductRepository')
const OrderShowPendingService = require('../services/Orders/OrderShowPendingService')

class OrderShowPendingController {

  async show(request, response) {
    const user_id = request.user.id 
    const orderRepository = new OrderRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const productRepository = new ProductRepository()
    const orderShowPendingService = new OrderShowPendingService(orderRepository, orderProductsRepository, productRepository)
    const order = await orderShowPendingService.execute({ user_id })
    return response.status(200).json(order)
  }
}

module.exports = OrderShowPendingController