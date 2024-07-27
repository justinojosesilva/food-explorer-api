const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const PaymentsController = require("../controllers/PaymentsController")


const paymentsRoutes = Router()
const paymentsController = new PaymentsController()

paymentsRoutes.use(ensureAuthenticated)
paymentsRoutes.get("/", verifyUserAuthorization("admin"), paymentsController.index)
paymentsRoutes.get("/:payment_id", paymentsController.show)
paymentsRoutes.post("/", paymentsController.create)
paymentsRoutes.put("/:payment_id", verifyUserAuthorization("admin"), paymentsController.update)
paymentsRoutes.delete("/:payment_id", verifyUserAuthorization("admin"), paymentsController.delete)

module.exports = paymentsRoutes