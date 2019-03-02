const Joi = require('joi')
const express = require('express')
const router = express.Router()

router.use(express.json())

const spc = require('../../models/SPC')
const ssc = require('../../models/SSC')
const BoardMember = require('../../models/BoardMember')

const companies = [
  new spc(
    'Organization Rule1',
    'Legal Form1',
    'الشركة',
    'The company',
    'hq_gov',
    'company_city',
    'company_address',
    'company_number',
    'company_fax',
    'EGP',
    50000,
    'Yosri Khaled',
    'Male',
    'Egyptian',
    'id',
    '10101010',
    '14/11/97',
    'investor_address',
    'investor_number',
    'investor_fax',
    'investor_email'
  ),
  new spc(
    'Organization Rule2',
    'Legal Form2',
    'الشركة٢',
    'The company2',
    'hq_gov2',
    'company_city2',
    'company_address2',
    'company_number2',
    'company_fax2',
    'EGP',
    50000,
    'Yosri Khaled',
    'Male',
    'Egyptian',
    'id',
    '10101010',
    '14/11/97',
    'investor_address',
    'investor_number',
    'investor_fax',
    'investor_email'
  ),
  new ssc(
    'Organization Rule3',
    'Legal Form3',
    'الشركة3',
    'The company3',
    'hq_gov3',
    'company_city3',
    'company_address3',
    'company_number3',
    'company_fax3',
    'EGP',
    50000,
    'Ahmed Ashraf',
    'Person',
    'Male',
    'Egyptian',
    'id',
    '10101010',
    '14/11/97',
    'investor_address',
    'investor_number',
    'investor_fax',
    'investor_email',
    [ new BoardMember('Omar Khairy', 'Person', 'Egyptian', 'Male', 'id', '123', '01/01/1990', 'address', 'CEO') ]
  )
]

router.get('/', (req, res) => res.json({ data: companies }))

router.get('/:id', (req, res) => {
  const company = companies.find(s => s.id === req.params.id)
  if (!company) { return res.status(404).send(`There is no company form with such id`) }
  res.send(company)
})

router.post('/', (req, res) => {
  const { error } = validateCompany(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  var company
  if (req.body.isSPC) {
    company = new spc(
      req.body.organizational_rule,
      req.body.legal_form,
      req.body.company_name_arabic,
      req.body.company_name_english,
      req.body.hq_governorate,
      req.body.hq_city,
      req.body.hq_address,
      req.body.hq_telephone,
      req.body.hq_fax,
      req.body.capital_currency,
      req.body.capital,
      req.body.investor_name,
      req.body.investor_gender,
      req.body.nationality,
      req.body.investor_id_type,
      req.body.investor_id_number,
      req.body.investor_birth_date,
      req.body.investor_address,
      req.body.investor_telephone,
      req.body.investor_fax,
      req.body.investor_email
    )
  } else {
    company = new ssc(
      req.body.organizational_rule,
      req.body.legal_form,
      req.body.company_name_arabic,
      req.body.company_name_english,
      req.body.hq_governorate,
      req.body.hq_city,
      req.body.hq_address,
      req.body.hq_telephone,
      req.body.hq_fax,
      req.body.capital_currency,
      req.body.capital,
      req.body.investor_name,
      req.body.investor_type,
      req.body.investor_gender,
      req.body.nationality,
      req.body.investor_id_type,
      req.body.investor_id_number,
      req.body.investor_birth_date,
      req.body.investor_address,
      req.body.investor_telephone,
      req.body.investor_fax,
      req.body.investor_email,
      req.body.board_members
    )
  }
  companies.push(company)
  res.send(company)
})

router.put('/:id', (req, res) => {
  const company = companies.find(s => s.id === req.params.id)
  if (!company) { return res.status(404).send(`There is no company form with such id`) }

  req.body.isSPC = company.isSPC
  const { error } = validateCompany(req.body)

  if (error) return res.status(400).send(error.details[0].message);

  (company.organizational_rule = req.body.organizational_rule),
  (company.legal_form = req.body.legal_form),
  (company.company_name_arabic = req.body.company_name_arabic),
  (company.company_name_english = req.body.company_name_english),
  (company.hq_governorate = req.body.hq_governorate),
  (company.hq_city = req.body.hq_city),
  (company.hq_address = req.body.hq_address),
  (company.hq_telephone = req.body.hq_telephone),
  (company.hq_fax = req.body.hq_fax),
  (company.capital_currency = req.body.capital_currency),
  (company.capital = req.body.capital),
  (company.investor_name = req.body.investor_name),
  (company.investor_gender = req.body.investor_gender),
  (company.nationality = req.body.nationality),
  (company.investor_id_type = req.body.investor_id_type),
  (company.investor_id_number = req.body.investor_id_number),
  (company.investor_birth_date = req.body.investor_birth_date),
  (company.investor_address = req.body.investor_address),
  (company.investor_telephone = req.body.investor_telephone),
  (company.investor_fax = req.body.investor_fax),
  (company.investor_email = req.body.investor_email)

  if (!company.isSPC) {
    company.investor_type = req.body.investor_type
    company.board_members = req.body.board_members
  }

  res.send(company)
})

router.delete('/:id', (req, res) => {
  const company = companies.find(s => s.id === req.params.id)
  if (!company) { return res.status(404).send(`There is no company form with such id`) }

  const index = companies.indexOf(company)
  companies.splice(index, 1)

  res.send(company)
})

function validateCompany (company) {
  var schema = {
    isSPC: Joi.boolean().required(),
    organizational_rule: Joi.string().required(),
    legal_form: Joi.string().required(),
    company_name_arabic: Joi.required(),
    company_name_english: Joi.string(),
    hq_governorate: Joi.required(),
    hq_city: Joi.required(),
    hq_address: Joi.string().required(),
    hq_telephone: Joi.string(),
    hq_fax: Joi.string(),
    capital_currency: Joi.required(),
    capital: Joi.number().min(50000).required(),
    investor_name: Joi.string().required(),
    nationality: Joi.required(),
    investor_id_type: Joi.required(),
    investor_id_number: Joi.string().required(),
    investor_gender: Joi.string(),
    investor_birth_date: Joi.date().required(),
    investor_address: Joi.string().required(),
    investor_telephone: Joi.string(),
    investor_fax: Joi.string(),
    investor_email: Joi.string()
  }

  if (!company.isSPC) {
    Object.assign(schema, {
      investor_type: Joi.string().required(),
      board_members: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        nationality: Joi.string().required(),
        gender: Joi.string().required(),
        id_type: Joi.string().required(),
        id_number: Joi.number().required(),
        birth_date: Joi.date().required(),
        address: Joi.string().required(),
        position: Joi.string().required()
      })).required()
    })
  }

  return Joi.validate(company, schema)
}

module.exports = router
