const AppError = require("../../utils/AppError")

class CategoryCreateService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ name, user_id }) {
    const checkCategoryExists = await this.categoryRepository.findByName(name)
    if(checkCategoryExists && checkCategoryExists.length > 0) {
      throw new AppError("Esta categoria já foi cadastrada.")
    }

    const category = await this.categoryRepository.create({ name, user_id })

    return category
  }

}

module.exports = CategoryCreateService