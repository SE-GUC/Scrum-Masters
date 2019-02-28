const express = require('express');
const router = express.Router();

const joi = require('joi');
const uuid = require('uuid');

const lawyer = require('../../models/lawyer.js')

const lawyer_data=[new lawyer('Mortada','dada@mansour.com',12345678,07000500)];
//Create
router.post('/create', (req,res) => {
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
  const telephone=req.body.telephone;

  const schema={
    name:joi.string().max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required(),
    telephone:joi.number().required(),
  }

  const result=joi.validate(req.body,schema);

  if (result.error) return res.status(400).send({error:result.error.details[0].message });
  
  const test=new lawyer(name,email,password,telephone);

  return res.json({data:test})
});

//
module.exports=router;