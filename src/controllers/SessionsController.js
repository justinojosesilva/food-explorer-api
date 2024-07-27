const UserRepository = require("../repositories/UserRepository")
const SessionCreateService = require("../services/Sessions/SessionCreateService")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body 
    const userRepository = new UserRepository()
    const sessionCreateService = new SessionCreateService(userRepository)
    const { user, token } = await sessionCreateService.execute({ email, password })
    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000
    })
    return response.status(201).json({user})
  }
}

module.exports = SessionsController