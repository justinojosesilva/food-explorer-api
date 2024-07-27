class UserRepositoryInMemory {
  users = []

  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password
    }
    this.users.push(user)
    return user
  }

  async findByEmail(email) {
    const user = this.users.filter(user => user.email === email)
    return user
  }

  async findById(user_id) {
    const user = this.users.filter(user => user.id === user_id)
    return user
  }

  async update({name, email, password, user_id}) {
    const userUpdate = this.users.find(user => user.id === user_id)
    userUpdate.name = name ?? userUpdate.name
    userUpdate.email = email ?? userUpdate.email
    userUpdate.password = password ?? userUpdate.password
    this.users.push(userUpdate)
    return userUpdate
  }
}