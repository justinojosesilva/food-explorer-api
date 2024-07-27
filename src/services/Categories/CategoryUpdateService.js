const AppError = require("../../utils/AppError")

class CategoryUpdateService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ category_id, name }) {
    const category = await this.categoryRepository.findById(category_id)
    if(!category) {
      throw new AppError("Categoria não encontrada!")
    }
    category.name = name ?? category.name
    await this.categoryRepository.update(category, category_id)
    return category
 }
}

module.exports = CategoryUpdateService