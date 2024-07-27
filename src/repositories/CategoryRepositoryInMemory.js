class CategoryRepositoryInMemory {
  categories = []

  async create({ name, user_id }) {
    const category = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      user_id
    }
    this.categories.push(category)
    return category
  }

  async findByName(name) {
    const category = this.categories.filter(category => category.name === name)
    return category
  }

  async findById(category_id) {
    const category = this.categories.filter(category => category.id === category_id)
    return category
  }

  async update(category, category_id) {
    const categoryUpdated = this.categories.find(category => category.id === category_id)
    categoryUpdated.name = name ?? category.name
    this.categories.push(categoryUpdated)
    return categoryUpdated
  }

  async delete(category_id) {
    const listDeleted = this.categories.filter(category => category.id !== category_id)
    this.categories = listDeleted
  }
}

module.exports = CategoryRepositoryInMemory