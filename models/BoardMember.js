const uuid = require('uuid')

class BoardMember {
  constructor (name, type, nationality, gender, id_type, id_number, birth_date, address, position) {
    this.id = uuid.v4()
    this.name = name
    this.type = type
    this.nationality = nationality
    this.gender = gender
    this.id_type = id_type
    this.id_number = id_number
    this.birth_date = birth_date
    this.address = address
    this.position = position
  };
};

module.exports = BoardMember
