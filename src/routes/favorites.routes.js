const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const FavoritesController = require("../controllers/FavoritesController")


const favoritesRoutes = Router()
const favoritesController = new FavoritesController()

favoritesRoutes.use(ensureAuthenticated)
favoritesRoutes.get("/", favoritesController.index)
favoritesRoutes.post("/:product_id", favoritesController.create)
favoritesRoutes.get("/:product_id", favoritesController.show)
favoritesRoutes.delete("/:product_id", favoritesController.delete)

module.exports = favoritesRoutes