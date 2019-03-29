const Joi = require('joi')
const Company = require('../models/company')
const Notification = require('../models/Notification')
const userController = require('../controllers/user-controller')


function validateupdateCompany (company) {
  const schema = {
    owner: Joi.string(),
    company_type: Joi.string(),
    organizational_rule: Joi.string(),
    legal_form: Joi.string(),
    company_name_arabic: Joi.string(),
    company_name_english: Joi.string(),
    hq_governorate: Joi.string(),
    hq_city: Joi.string(),
    hq_address: Joi.string(),
    hq_telephone: Joi.string(),
    hq_fax: Joi.string(),
    capital_currency: Joi.string(),
    capital: Joi.number()
      .min(50000),
    investor_name: Joi.string(),
    nationality: Joi.string(),
    investor_id_type: Joi.string(),
    investor_id_number: Joi.string(),
    investor_gender: Joi.string(),
    investor_birth_date: Joi.date(),
    investor_address: Joi.string(),
    investor_telephone: Joi.string(),
    investor_fax: Joi.string(),
    investor_email: Joi.string()
  }
  if (company.company_type === 'ssc') {
    Object.assign(schema, {
      investor_type: Joi.string(),
      board_members: Joi.array()
        .items(
          Joi.object({
            name: Joi.string(),
            type: Joi.string(),
            nationality: Joi.string(),
            gender: Joi.string(),
            id_type: Joi.string(),
            id_number: Joi.number(),
            birth_date: Joi.date(),
            address: Joi.string(),
            position: Joi.string()
          })
        )
    })
  }

  return Joi.validate(company, schema)
}

function validatecreateCompany (company) {
  const schema = {
    owner: Joi.string().required(),
    company_type: Joi.string().required(),
    organizational_rule: Joi.string().required(),
    legal_form: Joi.string().required(),
    company_name_arabic: Joi.string().required(),
    company_name_english: Joi.string(),
    hq_governorate: Joi.string().required(),
    hq_city: Joi.string().required(),
    hq_address: Joi.string().required(),
    hq_telephone: Joi.string(),
    hq_fax: Joi.string(),
    capital_currency: Joi.string().required(),
    capital: Joi.number()
      .min(50000)
      .required(),
    investor_name: Joi.string().required(),
    nationality: Joi.string().required(),
    investor_id_type: Joi.string().required(),
    investor_id_number: Joi.string().required(),
    investor_gender: Joi.string(),
    investor_birth_date: Joi.date().required(),
    investor_address: Joi.string().required(),
    investor_telephone: Joi.string(),
    investor_fax: Joi.string(),
    investor_email: Joi.string()
  }
  if (company.company_type === 'ssc') {
    Object.assign(schema, {
      investor_type: Joi.string().required(),
      board_members: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
            nationality: Joi.string().required(),
            gender: Joi.string().required(),
            id_type: Joi.string().required(),
            id_number: Joi.number().required(),
            birth_date: Joi.date().required(),
            address: Joi.string().required(),
            position: Joi.string().required()
          })
        )
        .required()
    })
  }

  return Joi.validate(company, schema)
}
exports.listAllCompanies = (req, res) => {
  Company.find({}, { _id: true })
    .then(company => {
      return res.json(company)
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.getCompany = (req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      if (!company) return res.status(404).send('company not found')
      return res.json(company)
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.createCompany = (req, res) => {
  const { error } = validatecreateCompany(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  Company.findOne(
    { company_name_arabic: req.body.company_name_arabic } || {
      company_name_english: req.body.company_name_english
    }
  )
    .then(company => {
      if (company) {
        return res
          .status(400)
          .send('An application is already created with this company name')
      }

      company = {}
      company = req.body
      Company.create(company)
        .then(company => {
          User.findByIdAndUpdate(company.owner, { $push: { companies: company._id } })
            .then(user => {
              return res.json(company)
            })
            .catch(err => {
              console.log(err)
              return res.sendStatus(500)
            })
        })
        .catch(err => {
          console.log(err)
          return res.sendStatus(500)
        })
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.updateCompany = (req, res) => {
  const { error } = validateupdateCompany(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(company => {
      if (!company) return res.status(404).send('application not found')
      return res.json(company)
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.deleteCompany = (req, res) => {
  Company.findByIdAndRemove(req.params.id)
    .then(company => {
      if (!company) return res.status(404).send('application not found')
      
      User.findByIdAndUpdate(company.owner, { $pull: { companies: company._id } })
        .then(user => {
          return res.json(company)
        })
        .catch(err => {
          console.log(err)
          return res.sendStatus(500)
        })
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

// exports.addFees = async (req, res) => {
//   const targetId = req.params.id
//   const feesvalue = req.body.feesvalue
//   if (!feesvalue) return res.status(400).send({ error: 'please enter the fees' })

//   if (typeof feesvalue !== 'number') { return res.status(400).send({ err: 'Invalid value for fees value' }) }

//   var targetApplication = await Company.findById(targetId)
//   if (!targetApplication) return res.status(404).send('application not found')
//   targetApplication.fees = feesvalue

//   const targetcompany = await Company.findByIdAndUpdate(targetId, targetApplication, { new: true })

//   return res.send(targetcompany)
// }

exports.listUnassignedApplications =async(req,res)=>{
  try {
   const companies= await Company.find({ assigned_status: false },{new:true})
  res.json({data:companies})
  }
  catch(error){
      console.log(error)
  }
  }



exports.listAllPaidCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ ispaid: true }, { new: true })
    res.json({ data: companies })
  } catch (error) {
    console.log(error)
  }
}

exports.listAllUnreviewedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ reviewed_statusreviewer: false }, { new: true })
    res.json({ data: companies })
  } catch (error) {
    console.log(error)
  }
}

exports.establishCompany = async(req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      if (company.established) return res.status(400).send({ error: "Company is already established" })
      if (!company.ispaid) return res.status(400).send({ error: "Fees have not been paid" })
      
      Company.findByIdAndUpdate(req.params.id, { established: true }, { new: true })
        .then(async company => {
          await userController.createNotificationForUser(
            { owner_id: company.owner, target_type: 'company', target_id: company._id, notif_text: "Your company has been established" }
          )
          return res.json({ msg: "Success", data: company })
        })
        .catch(err => {
          console.log(err)
          return res.sendStatus(500)
        })
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.calculateCompanyFees = async(req,res)=>{

const company_id = req.params.id
const company = await Company.findById(company_id)
if(! company ) return res.status(404).send('application not found')
const companyCapital= company.capital
const fees = ((1/1000)*(companyCapital))+((1/400)*companyCapital)+56
company.fees=fees
const targetcompany = await Company.findByIdAndUpdate(company_id,company, { new: true })
return res.json({targetcompany})


}