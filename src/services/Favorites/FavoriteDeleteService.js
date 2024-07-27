const AppError = require("../../utils/AppError")

class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, product_id }) {
    const checkFavoriteExists = await this.favoriteRepository.findByUserIdAndProductId(user_id, product_id)

    if(!checkFavoriteExists) {
      throw new AppError("Este produto não está como favorito.")
    }

    await this.favoriteRepository.delete( user_id, product_id )
  }
}

module.exports = FavoriteDeleteService