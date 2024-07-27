const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const ProductsController = require("../controllers/ProductsController")
const ProductAvatarController = require("../controllers/ProductAvatarController")


const productsRoutes = Router()
const upload = multer(uploadConfig.MULTER)
const productsController = new ProductsController()
const productAvatarController = new ProductAvatarController()

productsRoutes.use(ensureAuthenticated)
productsRoutes.get("/", productsController.index)
productsRoutes.get("/:product_id", productsController.show)
productsRoutes.post("/", verifyUserAuthorization("admin"), productsController.create)
productsRoutes.put("/:product_id", verifyUserAuthorization("admin"), productsController.update)
productsRoutes.patch("/avatar/:product_id", verifyUserAuthorization("admin"), upload.single("image"),  productAvatarController.update)
productsRoutes.delete("/:product_id", verifyUserAuthorization("admin"), productsController.delete)

module.exports = productsRoutes