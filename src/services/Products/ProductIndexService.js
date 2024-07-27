class ProductIndexService {
  constructor(
    categoryRepository,
    productRepository,
    favoriteRepository,
    productItemsRepository
  ) {
    this.categoryRepository = categoryRepository
    this.productRepository = productRepository
    this.favoriteRepository = favoriteRepository
    this.productItemsRepository = productItemsRepository
  }


  async execute({ search, user_id }) {
    const categories = await this.categoryRepository.findAll()
    if(search == 'undefined' ) {
      search = ""
    }
    if(search.length > 0) {
      search = search.toUpperCase()
    }
    const products = await this.productRepository.findAllWithFavorite(search, user_id)

    const productsFavoritesBoolean = products.map(product => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        favorite: product.favorite > 0
      }
    })

    const productsGrouping = productsFavoritesBoolean.filter(function (a){
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
    }, Object.create(null))
    
    const productsByCategories = categories.map((category) => {
      const productsByCategory = productsGrouping.filter(product => (product.category_id === category.id))
      return {
        ...category,
        products: productsByCategory
      }
    })

    return productsByCategories
  }
}

module.exports = ProductIndexService