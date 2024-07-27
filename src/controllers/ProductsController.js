const CategoryRepository = require('../repositories/CategoryRepository')
const FavoriteRepository = require('../repositories/FavoriteRepository')
const ProductRepository = require('../repositories/ProductRepository')
const ProductItemsRepository = require('../repositories/ProductItemsRepository')
const ProductCreateService = require('../services/Products/ProductCreateService')
const ProductDeleteService = require('../services/Products/ProductDeleteService')
const ProductIndexService = require('../services/Products/ProductIndexService')
const ProductShowService = require('../services/Products/ProductShowService')
const ProductUpdateService = require('../services/Products/ProductUpdateService')

class ProductsController {

  async create(request, response) {
    const { name, description, image, price, items, category_id } = request.body 
    const user_id = request.user.id 

    const productRepository = new ProductRepository()
    const productItemsRepository = new ProductItemsRepository()
    const productCreateService = new ProductCreateService(productRepository, productItemsRepository)
    const newProduct = await productCreateService.execute({
      name,
      description,
      image,
      price,
      items,
      category_id,
      user_id
    })
    return response.status(201).json(newProduct)
  }

  async update(request, response) {
    const { name, description, image, price, items, category_id } = request.body 
    const { product_id } = request.params 
    const user_id = request.user.id

    const productRepository = new ProductRepository()
    const productItemsRepository = new ProductItemsRepository()
    const productUpdateService = new ProductUpdateService(productRepository, productItemsRepository)
    const product = await productUpdateService.execute({
      name,
      description,
      price,
      items,
      category_id,
      product_id,
      user_id
    })
    return response.status(200).json(product)
  }

  async delete(request, response) {
    const { product_id } = request.params 
    const productRepository = new ProductRepository()
    const productItemsRepository = new ProductItemsRepository()
    const productDeleteService = new ProductDeleteService(productRepository, productItemsRepository)
    await productDeleteService.execute({ product_id })
    return response.status(200).json()
  }

  async show(request, response) {
    const { product_id } = request.params 
    const productRepository = new ProductRepository()
    const productItemsRepository = new ProductItemsRepository()
    const productShowService = new ProductShowService(productRepository, productItemsRepository)
    const product = await productShowService.execute({ product_id })
    return response.status(200).json(product)
  }
  
  async index(request, response) {
    const { search } = request.query
    const user_id = request.user.id
    const productRepository = new ProductRepository()
    const categoryRepository = new CategoryRepository()
    const favoriteRepository = new FavoriteRepository()
    const productIndexService = new ProductIndexService(categoryRepository, productRepository, favoriteRepository)
    const products = await productIndexService.execute({ search, user_id })
    return response.status(200).json(products)
  }

}

module.exports = ProductsController