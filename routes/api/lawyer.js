const express = require('express');
const router = express.Router();

const joi = require('joi');
const uuid = require('uuid');

const lawyer = require('../../models/lawyer.js')

const lawyer_data=[new lawyer(1,'Mortada','dada@mansour.com',12345678,07000500,null),
                  new lawyer(2,'Mortaaa','dadaaa@mansour.com',12245678,070450500,null)];

//Create
router.post('/', (req,res) => {
  const { error }=validateLawyer(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const ID=lawyer_data.length+1;
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
  const telephone=req.body.telephone;
  
  const createdLawyer=new lawyer(ID,name,email,password,telephone);
  lawyer_data.push(createdLawyer);
  return res.json(createdLawyer);
});

//Retrieve all
router.get('/', (req,res)=>{
  res.send(lawyer_data);
})

//Retrieve specific
router.get('/:ID', (req,res)=>{
  const wantedID=parseInt(req.params.ID);
  const specificLawyer=lawyer_data.find(e=>e.ID === wantedID);
  if(!specificLawyer) return res.status(404).send('No lawyer with the specified ID has been found');
  res.send(specificLawyer);
})

//Update
router.put('/:ID', (req,res)=>{
  const wantedID=parseInt(req.params.ID);
  const updateLawyer=lawyer_data.find(e=>e.ID === wantedID);
  if(!updateLawyer) return res.status(404).send('No lawyer with the specified ID has been found');
  const { error }=validateLawyer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  updateLawyer.name=req.body.name;
  updateLawyer.email=req.body.email;
  updateLawyer.password=req.body.passsword;
  updateLawyer.telephone=req.body.telephone;
  res.send(updateLawyer);
})

//Deletion
router.delete('/:ID', (req,res)=>{
  const wantedID=parseInt(req.params.ID);
  const deleteLawyer=lawyer_data.find(e=>e.ID === wantedID);
  if(!deleteLawyer) return res.status(404).send('No lawyer with the specified ID has been found');
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