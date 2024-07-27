const AppError = require("../../utils/AppError")

class FavoriteCreateService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, product_id }) {
    const checkFavoriteExists = await this.favoriteRepository.findByUserIdAndProductId(user_id, product_id)

    if(checkFavoriteExists) {
      throw new AppError("Este produto já está como favorito.")
    }

    await this.favoriteRepository.create({ user_id, product_id })
  }
}

module.exports = FavoriteCreateService