const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const OrdersController = require("../controllers/OrdersController")
const OrderShowPendingController = require("../controllers/OrdersPendingController")


const ordersRoutes = Router()
const ordersController = new OrdersController()
const orderShowPendingController = new OrderShowPendingController()

ordersRoutes.use(ensureAuthenticated)
ordersRoutes.get("/", ordersController.index)
ordersRoutes.get("/pending", orderShowPendingController.show)
ordersRoutes.get("/:order_id", ordersController.show)
ordersRoutes.post("/", ordersController.create)
ordersRoutes.put("/:order_id", ordersController.update)
ordersRoutes.delete("/:order_id", verifyUserAuthorization("admin"), ordersController.delete)
ordersRoutes.patch("/:order_id", verifyUserAuthorization("admin"), ordersController.patch)

module.exports = ordersRoutes