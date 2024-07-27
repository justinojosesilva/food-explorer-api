const AppError = require("../../utils/AppError")

class FavoriteIndexService {
  constructor(favoriteRepository, userRepository) {
    this.favoriteRepository = favoriteRepository
    this.userRepository = userRepository
  }

  async execute({ user_id }) {
    const user = await this.userRepository.findById(user_id)
    if(!user) {
      throw new AppError("Usuário não encontrado!")
    }

    if(user.role === 'user') {
      const favorites = await this.favoriteRepository.findByUserI(user.id)
      return favorites
    } else {
      const favorites = await this.favoriteRepository.findAll()
      return favorites
    }
  }

}

module.exports = FavoriteIndexService