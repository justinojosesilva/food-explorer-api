class FavoriteShowService {

  constructor(
    favoriteRepository
  ) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ product_id, user_id }) {
    const favorite = await this.favoriteRepository.findByUserIdAndProductId(user_id, product_id)

    return favorite
  }
}

module.exports = FavoriteShowService