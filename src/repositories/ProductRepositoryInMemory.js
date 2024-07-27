class ProductRepositoryInMemory {
  products = []

  async create({ name, description, price, image, category_id, user_id  }) {
    const product = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      description, 
      price, 
      image, 
      category_id, 
      user_id 
    }
    this.products.push(product)
    return product
  }

  async findByName(name) {
    const product = this.products.filter(product => product.name === name)
    return product
  }

  async findById(product_id) {
    const product = this.products.filter(product => product.id === product_id)
    return category
  }

  async update(product, product_id) {
    const productUpdated = this.products.find(product => product.id === product_id)
    productUpdated.name = name ?? product.name
    this.products.push(productUpdated)
    return productUpdated
  }

  async delete(product_id) {
    const listDeleted = this.products.filter(product => product.id !== product_id)
    this.products = listDeleted
  }

}

module.exports = ProductRepositoryInMemory