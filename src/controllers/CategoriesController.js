const CategoryRepository = require("../repositories/CategoryRepository")
const CategoryCreateService = require("../services/Categories/CategoryCreateService")
const CategoryUpdateService = require("../services/Categories/CategoryUpdateService")
const CategoryShowService = require("../services/Categories/CategoryShowService")
const CategoryIndexService = require("../services/Categories/CategoryIndexService")
const CategoryDeleteService = require("../services/Categories/CategoryDeleteService")

class CategoriesController {

  async create(request, response) {
    const { name } = request.body 
    const user_id = request.user.id
    const categoryRepository = new CategoryRepository()
    const categoryCreateService = new CategoryCreateService(categoryRepository)
    await categoryCreateService.execute({ name, user_id })
    return response.status(201).json()
  }

  async update(request, response) {
    const { name } = request.body 
    const { category_id } = request.params
    const categoryRepository = new CategoryRepository()
    const categoryUpdateService = new CategoryUpdateService(categoryRepository)
    const category = await categoryUpdateService.execute({ name, category_id })
    return response.status(200).json(category)
  }

  async show(request, response) {
    const { category_id } = request.params
    const categoryRepository = new CategoryRepository()
    const categoryShowService = new CategoryShowService(categoryRepository)
    const category = await categoryShowService.execute({ id: category_id })
    return response.status(200).json(category)
  }

  async index(request, response) {
    const categoryRepository = new CategoryRepository()
    const categoryIndexService = new CategoryIndexService(categoryRepository)
    const categories = await categoryIndexService.execute()
    return response.status(200).json(categories)
  }

  async delete(request, response) {
    const { category_id } = request.params
    const categoryRepository = new CategoryRepository()
    const categoryDeleteService = new CategoryDeleteService(categoryRepository)
    await categoryDeleteService.execute({ category_id })
    return response.status(200).json()
  }
  
}

module.exports = CategoriesController