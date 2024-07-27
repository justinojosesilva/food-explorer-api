const AppError = require("../../utils/AppError")

class CategoryDeleteService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ category_id }) {
    const category = await this.categoryRepository.findById(category_id)
    if(!category) {
      throw new AppError("Categoria não encontrada!", 401)
    }
    await this.categoryRepository.delete(category.id)
  }
}

module.exports = CategoryDeleteService