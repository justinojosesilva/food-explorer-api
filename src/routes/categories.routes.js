const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const CategoriesController = require("../controllers/CategoriesController")


const categoriesRoutes = Router()
const categoriesController = new CategoriesController()

categoriesRoutes.use(ensureAuthenticated)
categoriesRoutes.get("/", categoriesController.index)
categoriesRoutes.get("/:category_id", categoriesController.show)
categoriesRoutes.post("/", verifyUserAuthorization("admin"), categoriesController.create)
categoriesRoutes.put("/:category_id", verifyUserAuthorization("admin"), categoriesController.update)
categoriesRoutes.delete("/:category_id", verifyUserAuthorization("admin"), categoriesController.delete)

module.exports = categoriesRoutes