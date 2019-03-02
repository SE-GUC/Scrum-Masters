const uuid = require('uuid')

class admin {
  constructor (id, name, email, password, age, gender, nationality) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.age = age
    this.gender = gender
    this.nationality = nationality
  }
}
module.exports = admin
