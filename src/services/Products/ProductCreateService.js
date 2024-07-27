const AppError = require("../../utils/AppError")

class ProductCreateService {
  constructor(
    productRepository,
    productItemsRepository
  ) {
    this.productRepository = productRepository
    this.productItemsRepository = productItemsRepository
  }

  async execute({ name, description, price, image, items, category_id, user_id }) {
    const checkProductExist = await this.productRepository.findByName(name)
    
    if( checkProductExist && checkProductExist.length > 0 ) {
      throw new AppError("Produto Já Cadastrado.")
    }

    if( !category_id ) {
      throw new AppError("A categoria do produto não foi informada.")
    }

    if ( price && price < 0 ) {
      throw new AppError("Produto não pode ter valor menor que 0.")
    }

    if(image) {
      // TODO: implementar upload de image
    }

    const product = await this.productRepository.create({
      name, 
      description, 
      price, 
      image, 
      category_id, 
      user_id
    })

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
}

module.exports = ProductCreateService