const OrderRepository = require('../repositories/OrderRepository')
const UserRepository = require('../repositories/UserRepository')
const OrderProductsRepository = require('../repositories/OrderProductsRepository')
const ProductRepository = require('../repositories/ProductRepository')
const OrderCreateService = require('../services/Orders/OrderCreateService')
const OrderDeleteService = require('../services/Orders/OrderDeleteService')
const OrderIndexService = require('../services/Orders/OrderIndexService')
const OrderShowService = require('../services/Orders/OrderShowService')
const OrderUpdateService = require('../services/Orders/OrderUpdateService')
const OrderPatchStatusService = require('../services/Orders/OrderPatchStatusService')

class OrdersController {
  async index(request, response) {
    const user_id = request.user.id
    const orderRepository = new OrderRepository()
    const userRepository = new UserRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const productRepository  = new ProductRepository()
    const orderIndexService = new OrderIndexService(orderRepository, userRepository, orderProductsRepository, productRepository)
    const orders = await orderIndexService.execute({ user_id })
    return response.status(200).json(orders)    
  }

  async show(request, response) {
    const { order_id } = request.params
    const orderRepository = new OrderRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const orderShowService = new OrderShowService(orderRepository, orderProductsRepository)
    const order = await orderShowService.execute({ order_id })
    return response.status(200).json(order) 
  }

  async show(request, response) {
    const { order_id } = request.params
    const orderRepository = new OrderRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const orderShowService = new OrderShowService(orderRepository, orderProductsRepository)
    const order = await orderShowService.execute({ order_id })
    return response.status(200).json(order) 
  }

  async create(request, response) {
    const { amount, products } = request.body 
    const user_id = request.user.id 
    const orderRepository = new OrderRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const orderCreateService = new OrderCreateService(orderRepository, orderProductsRepository)
    const order = await orderCreateService.execute({ amount, products, user_id })
    return response.status(201).json(order)
  }

  async update(request, response) {
    const { status, amount, products } = request.body
    const { order_id } = request.params 
    const user_id = request.user.id 
    const orderRepository = new OrderRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const orderUpdateService = new OrderUpdateService(orderRepository, orderProductsRepository)
    const order = await orderUpdateService.execute({ status, amount, products, user_id, order_id })
    return response.status(200).json(order)
  }

  async delete(request, response) {
    const { order_id } = request.params 
    const orderRepository = new OrderRepository()
    const orderProductsRepository = new OrderProductsRepository()
    const orderDeleteService = new OrderDeleteService(orderRepository, orderProductsRepository)
    await orderDeleteService.execute({ order_id })
    return response.status(200).json()
  }

  async patch(request, response) {
    const { status } = request.body
    const { order_id } = request.params 
    const orderRepository = new OrderRepository()
    const orderPatchStatusService = new OrderPatchStatusService(orderRepository)
    await orderPatchStatusService.execute({ status, order_id })
    return response.status(200).json()
  }
}

module.exports = OrdersController