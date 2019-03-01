const uuid=require('uuid')

class Investor{
    constructor(name,email,password,age,gender,nationality,telephone,company_applications)
    {
        this.ID=uuid;
        this.name=name;
        this.email=email;
        this.password=password;
        this.age=age;
        this.gender=gender;
        this.nationality=nationality;
        this.telephone=telephone;
        this.company_applications=company_applications;
    }
}

module.exports=Investor