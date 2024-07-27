const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const OrderShowPendingController = require("../controllers/OrdersPendingController")


const ordersPendingRoutes = Router()
const orderShowPendingController = new OrderShowPendingController()

ordersPendingRoutes.use(ensureAuthenticated)
ordersPendingRoutes.get("/", orderShowPendingController.show)
module.exports = ordersPendingRoutes