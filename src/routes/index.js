const { Router } = require("express")
const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")
const categoriesRoutes = require("./categories.routes")
const productsRoutes = require("./products.routes")
const ordersRoutes = require("./orders.routes")
const ordersPendingRoutes = require("./orders-pending.routes")
const paymentsRoutes = require("./payments.routes")
const favoritesRoutes = require("./favorites.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/categories", categoriesRoutes)
routes.use("/products", productsRoutes)
routes.use("/orders", ordersRoutes)
routes.use("/orders-pending", ordersPendingRoutes)
routes.use("/payments", paymentsRoutes)
routes.use("/favorites", favoritesRoutes)

module.exports = routes
