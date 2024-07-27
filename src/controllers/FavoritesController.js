const FavoriteRepository = require("../repositories/FavoriteRepository")
const UserRepository = require("../repositories/UserRepository")
const FavoriteCreateService = require("../services/Favorites/FavoriteCreateService")
const FavoriteDeleteService = require("../services/Favorites/FavoriteDeleteService")
const FavoriteShowService = require("../services/Favorites/FavoriteShowService")
const FavoriteIndexService = require("../services/Favorites/FavoriteIndexService")

class FavoritesController {
  async create(request, response) {
    const { product_id } = request.params 
    const user_id = request.user.id 
    const favoriteRepository = new FavoriteRepository()
    const favoriteCreateService = new FavoriteCreateService(favoriteRepository)
    await favoriteCreateService.execute({ user_id, product_id })
    return response.status(201).json()
  }

  async delete(request, response) {
    const { product_id } = request.params 
    const user_id = request.user.id 
    const favoriteRepository = new FavoriteRepository()
    const favoriteDeleteService = new FavoriteDeleteService(favoriteRepository)
    await favoriteDeleteService.execute({ user_id, product_id })
    return response.status(200).json()
  }

  async index(request, response) {
    const user_id = request.user.id 
    const favoriteRepository = new FavoriteRepository()
    const userRepository = new UserRepository()
    const favoriteIndexService = new FavoriteIndexService(favoriteRepository, userRepository)
    const favorites = await favoriteIndexService.execute({ user_id })
    return response.status(200).json(favorites)
  }

  async show(request, response) {
    const { product_id } = request.params 
    const user_id = request.user.id 

    const favoriteRepository = new FavoriteRepository()
    const favoriteShowService = new FavoriteShowService(favoriteRepository)
    const favorite = await favoriteShowService.execute({ product_id, user_id })
    return response.status(200).json(favorite)
  }

}

module.exports = FavoritesController