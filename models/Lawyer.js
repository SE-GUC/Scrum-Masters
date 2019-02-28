const uuid = require('uuid')

class Lawyer{
    constructor(ID,name,email,password,telephone)
    {
        this.ID=ID;
        this.name=name;
        this.email=email;
        this.password=password;
        this.telephone=telephone;
    }
}

module.exports=Lawyer