const AppError = require("../../utils/AppError")

class ProductDeleteService {
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
    await this.productItemsRepository.delete(product.id)
    await this.productRepository.delete(product.id)
  }
}

module.exports = ProductDeleteService