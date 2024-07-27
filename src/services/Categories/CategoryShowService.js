class CategoryShowService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ id }) {
    const category = await this.categoryRepository.findById(id)
    return category
 }
}

module.exports = CategoryShowService