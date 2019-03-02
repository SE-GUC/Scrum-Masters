const express = require('express')
const router = express.Router()

const joi = require('joi');
const uuid = require('uuid');

const Investor = require('../../models/Investor')


const investor_data=[new Investor('omar','omar.abdullah@mail.com','094543cds',21,'male','Egyptian','0109808583',null),
new Investor('omar','omar.abdullah@mail.com','094543cds',21,'male','Egyptian','0109808583',null)]

//Create
router.post('/', (req, res) => {
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
    investor_data.push(test)

    return res.json({ data: test });

});

//Retrieve all data
router.get('/', (req, res) => {
    res.send(investor_data)
})

//Retrieve specific data
router.get('/:id', (req, res) => {
    const id = req.params.id  
    const investor = investor_data.find(investor => investor.ID === id)
    if(!investor) return res.status(404).send({error: 'investor does not exist'})
    res.send(investor)
})

//Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id 
    const investor = investor_data.find(investor => investor.ID === id)
    if(!investor) return res.status(404).send({error: 'investor does not exist'})
    const index = investor_data.indexOf(investor)
    investor_data.splice(index,1)
    res.send(investor)
})

//Update
router.put('/:id', (req,res) => {
    
    const id = req.params.id  
    const investor = investor_data.find(investor => investor.ID === id)
     if(!investor) return res.status(404).send({error: 'investor does not exist'})
     const schema = {
        
        name:joi.string().max(30),
        email:joi.string().email(),
        password:joi.string().min(8),
        age:joi.number(),
        gender:joi.string(),
        nationality:joi.string().max(15),
        telephone:joi.number(),
		
    }
    
    const result = joi.validate(req.body, schema);
     if (result.error) return res.status(400).send({ error: result.error.details[0].message })
     investor.name=req.body.name
     investor.email=req.body.email
     investor.password=req.body.password
     investor.age=req.body.age
     investor.gender=req.body.gender
     investor.nationality=req.body.nationality
     investor.telephone=req.body.telephone
     investor.company_applications=req.body.company_applications

     res.json({msg: 'Update done successfully'})
    }
    
 )


module.exports = router;

