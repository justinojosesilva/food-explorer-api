const AppError = require("../../utils/AppError")

class OrderIndexService {
  constructor(
    orderRepository,
    userRepository,
    orderProductsRepository,
    productRepository
  ) {
    this.orderRepository = orderRepository
    this.userRepository = userRepository
    this.orderProductsRepository = orderProductsRepository
    this.productRepository = productRepository
  }

  async execute({ user_id }) {
    const user = await this.userRepository.findById(user_id)
    if(!user) {
      throw new AppError("Usuário não encontrado.")
    }
    let orders = null
    if(user.role === 'user') {
      orders = await this.orderRepository.findByUserId(user.id)
    } else {
      orders = await this.orderRepository.findAll()
      
    }

    return groupReturn(orders)
  }
}

function groupReturn(orders) {
  const grouped = Object.entries(orders.reduce((acc, item) => {
    const group =  item.id
    if(!acc[group]) {
      acc[group] = { 
        id: item.id,
        amount: item.amount,
        status: item.status, 
        date: item.updated_at, 
        products: []
      }
    }
    acc[group].products.push({
      quantity: item.quantity,
      product_id: item.product_id,
      name: item.name
    })
    return acc
  }, {})).map(([key, value])=> ({ key, ...value }))

  return grouped
}

module.exports = OrderIndexService