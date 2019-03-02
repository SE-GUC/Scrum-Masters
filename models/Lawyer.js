
class Lawyer {
  constructor (name, email, password, telephone, tasks) {
    this.id = uuid.v4()
    this.name = name
    this.email = email
    this.password = password
    this.telephone = telephone
    this.tasks = tasks
  }
}

module.exports = Lawyer
