const uuid = require('uuid')

class Lawyer{
    constructor(name,email,password,telephone)
    {
        this.ID=uuid.v4;
        this.name=name;
        this.email=email;
        this.password=password;
        this.telephone=telephone;
    }
}

module.exports=Lawyer