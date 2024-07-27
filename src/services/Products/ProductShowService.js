const AppError = require("../../utils/AppError")

class ProductShowService {
  constructor(
    productRepository,
    productItemsRepository
  ) {
    this.productRepository = productRepository
    this.productItemsRepository = productItemsRepository
  }
  async execute({ product_id }) {
    const product = await this.productRepository.findById(product_id)
    if(!product) {
      throw new AppError("Produto não encontrado.")
    }

    const productItems = await this.productItemsRepository.findByProductId(product.id)

    return {
      ...product,
      items: productItems
    }
  }
}

module.exports = ProductShowService