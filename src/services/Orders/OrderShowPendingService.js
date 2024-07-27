class OrderShowPendingService {

  constructor(
    orderRepository,
    orderProductsRepository,
    productRepository
    ) {
    this.orderRepository = orderRepository
    this.orderProductsRepository = orderProductsRepository
    this.productRepository = productRepository
  }

  async execute({ user_id }) {
    const order = await this.orderRepository.findByUserIdAndStatusPending(user_id)
    if(!order){
      return null
    }
    const orderProducts = await this.orderProductsRepository.findByOrderId(order.id)
    const newProducts = orderProducts.map(prod => {
      return {
        quantity: prod.quantity,
        product: {
          id: prod.product_id                               ,
          name: prod.name,
          description: prod.description,
          image: prod.image,
          price: prod.price,
        }        
      }
    }) 

    return {
      ...order,
      products: newProducts
    }
  }

}

module.exports = OrderShowPendingService