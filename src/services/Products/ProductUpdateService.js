const AppError = require("../../utils/AppError")
const DiskStorage = require("../../providers/DiskStorage")

class ProductUpdateService {
  constructor(
    productRepository,
    productItemsRepository
  ) {
    this.productRepository = productRepository
    this.productItemsRepository = productItemsRepository
  }

  async execute({ name, description, price, items, category_id, product_id, user_id }) {
    const product = await this.productRepository.findById(product_id)
    if(!product) {
      throw new AppError("Produto não encontrado.")
    }
    const diskStorage = new DiskStorage()

    product.name = name ?? product.name
    product.description = description ?? product.description
    product.price = price ?? product.price
    product.category_id = category_id ?? product.category_id

    await this.productRepository.update(product, product.id)

    await this.productItemsRepository.delete(product.id)

    if(items) {
      const productItemsInsert = items.map( name => {
        return {
          name,
          user_id,
          product_id: product.id
        }
      })
      await this.productItemsRepository.create(productItemsInsert)

      return {
        ...product,
        items: productItemsInsert
      }
    }
    return product
  }
}

module.exports = ProductUpdateService