const express = require('express');
const router = express.Router();

const joi = require('joi');

const lawyer = require('../../models/lawyer.js')

const lawyer_data=[new lawyer('John','johnschmidt@abc.com',12345678,07000500,null),
                   new lawyer('Mark','mark@abc.com',12245678,070450500,null)];

//Create
router.post('/', (req,res) => {
  const { error }=validateLawyer(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
  const telephone=req.body.telephone;
  const tasks=null;
  
  const createdLawyer=new lawyer(name,email,password,telephone,tasks);
  lawyer_data.push(createdLawyer);
  return res.json(createdLawyer);
});

//Retrieve all
router.get('/', (req,res)=>{
  res.send(lawyer_data);
})

//Retrieve specific
router.get('/:id', (req,res)=>{
  const wantedID=req.params.id;
  const specificLawyer=lawyer_data.find(e=>e.id === wantedID);
  if(!specificLawyer) return res.status(404).send('No lawyer with the specified id has been found');
  res.send(specificLawyer);
})

//Update
router.put('/:id', (req,res)=>{
  const wantedID=req.params.id;
  const updateLawyer=lawyer_data.find(e=>e.id === wantedID);
  if(!updateLawyer) return res.status(404).send('No lawyer with the specified id has been found');
  const { error }=validateLawyer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  updateLawyer.name=req.body.name;
  updateLawyer.email=req.body.email;
  updateLawyer.password=req.body.passsword;
  updateLawyer.telephone=req.body.telephone;
  res.send(updateLawyer);
})

//Deletion
router.delete('/:id', (req,res)=>{
  const wantedID=req.params.id;
  const deleteLawyer=lawyer_data.find(e=>e.id === wantedID);
  if(!deleteLawyer) return res.status(404).send('No lawyer with the specified id has been found');
  const index = lawyer_data.indexOf(deleteLawyer);
  lawyer_data.splice(index,1);
  res.send(deleteLawyer);
})

//Validation
function validateLawyer(lawyer){
  const schema={
    name:joi.string().max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required(),
    telephone:joi.number().required()
  }

  return joi.validate(lawyer,schema);
}

module.exports=router;
