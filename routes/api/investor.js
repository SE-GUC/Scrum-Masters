const express = require('express')
const router = express.Router()

const joi = require('joi');
const uuid = require('uuid');

const Investor = require('../../models/Investor')


const investor_data=[new Investor('omar','omar.abdullah@mail.com','094543cds',21,'male','Egyptian','0109808583',null)]

//Create
router.post('/create', (req, res) => {
    const name=req.body.name
    const email=req.body.name
    const password=req.body.password
    const age=req.body.age
    const gender=req.body.gender
    const nationality=req.body.nationality
    const telephone=req.body.telephone

    const schema = {
        
        name:joi.string().max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).required(),
        age:joi.number().required(),
        gender:joi.string().required(),
        nationality:joi.string().max(15).required(),
        telephone:joi.number().required(),
		
    }
    
    const result = joi.validate(req.body, schema);
    
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const test=new Investor(name,email,password,age,gender,nationality,telephone,null)

    return res.json({ data: test });

});

//Retrieve all data
router.get('/getall', (req, res) => {
    res.send(investor_data)
})

//Retrieve specific data
router.get('/get:id', (req, res) => {
    const investor_ID = req.params.ID
    const invetor = investor_data.find(invetor => invetor.ID === investor_ID)
    res.send(invetor)
})



module.exports = router;

