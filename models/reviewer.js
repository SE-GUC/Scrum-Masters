// The Reviewer Model

class Reviewer {
  constructor (id, name, email, password, telephone, tasks) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.telephone = telephone
    this.tasks = tasks
  }
}

module.exports = Reviewer
