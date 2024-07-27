const DiskStorage = require("../providers/DiskStorage")
const ProductRepository = require('../repositories/ProductRepository')
const ProductItemsRepository = require('../repositories/ProductItemsRepository')
const ProductShowService = require('../services/Products/ProductShowService')

class ProductAvatarController {
  async update(request, response) {
    const { product_id } = request.params
    const avatarFilename = request.file.filename 
    const diskStorage = new DiskStorage()

    const productRepository = new ProductRepository()
    const productItemsRepository = new ProductItemsRepository()
    const productShowService = new ProductShowService(productRepository, productItemsRepository)
    const product = await productShowService.execute({ product_id })
    if(product.image) {
      await diskStorage.deleteFile(product.image)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    product.image = filename

    delete product.items
    await productRepository.update(product, product_id)

    return response.json(product)
  }
}

module.exports = ProductAvatarController