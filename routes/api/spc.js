const Joi = require('joi')
const express = require('express')
const router = express.Router()
const uuid = require('uuid')

router.use(express.json())

const spc = require('../../models/SPC')

const spcs = [
  new spc(
    1,
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
    2,
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
  )
]

router.get('/', (req, res) => res.json({ data: spcs }))

router.get('/:id', (req, res) => {
  const spc = spcs.find(s => s.id === parseInt(req.params.id))
  if (!spc) { return res.status(404).send(`There is no spc company form with such id`) }
  res.send(spc)
})

router.post('/', (req, res) => {
  const { error } = validateSPC(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const spc = {
    id: spcs.length + 1,
    organizational_rule: req.body.organizational_rule,
    legal_form: req.body.legal_form,
    company_name_arabic: req.body.company_name_arabic,
    company_name_english: req.body.company_name_english,
    hq_governorate: req.body.hq_governorate,
    hq_city: req.body.hq_city,
    hq_address: req.body.hq_address,
    hq_telephone: req.body.hq_telephone,
    hq_fax: req.body.hq_fax,
    capital_currency: req.body.capital_currency,
    capital: req.body.capital,
    investor_name: req.body.investor_name,
    investor_gender: req.body.investor_gender,
    nationality: req.body.nationality,
    investor_id_type: req.body.investor_id_type,
    investor_id_number: req.body.investor_id_number,
    investor_birth_date: req.body.investor_birth_date,
    investor_address: req.body.investor_address,
    investor_telephone: req.body.investor_telephone,
    investor_fax: req.body.investor_fax,
    investor_email: req.body.investor_email
  }
  spcs.push(spc)
  res.send(spc)
})

router.put('/:id', (req, res) => {
  const spc = spcs.find(s => s.id === parseInt(req.params.id))
  if (!spc) { return res.status(404).send(`There is no spc company form with such id`) }

  const { error } = validateSPC(req.body)

  if (error) return res.status(400).send(error.details[0].message);

  (spc.organizational_rule = req.body.organizational_rule),
  (spc.legal_form = req.body.legal_form),
  (spc.company_name_arabic = req.body.company_name_arabic),
  (spc.company_name_english = req.body.company_name_english),
  (spc.hq_governorate = req.body.hq_governorate),
  (spc.hq_city = req.body.hq_city),
  (spc.hq_address = req.body.hq_address),
  (spc.hq_telephone = req.body.hq_telephone),
  (spc.hq_fax = req.body.hq_fax),
  (spc.capital_currency = req.body.capital_currency),
  (spc.capital = req.body.capital),
  (spc.investor_name = req.body.investor_name),
  (spc.investor_gender = req.body.investor_gender),
  (spc.nationality = req.body.nationality),
  (spc.investor_id_type = req.body.investor_id_type),
  (spc.investor_id_number = req.body.investor_id_number),
  (spc.investor_birth_date = req.body.investor_birth_date),
  (spc.investor_address = req.body.investor_address),
  (spc.investor_telephone = req.body.investor_telephone),
  (spc.investor_fax = req.body.investor_fax),
  (spc.investor_email = req.body.investor_email)

  res.send(spc)
})

router.delete('/:id', (req, res) => {
  const spc = spcs.find(s => s.id === parseInt(req.params.id))
  if (!spc) { return res.status(404).send(`There is no spc company form with such id`) }

  const index = spcs.indexOf(spc)
  spcs.splice(index, 1)

  res.send(spc)
})

function validateSPC (spc) {
  const schema = {
    organizational_rule: Joi.required(),
    organizational_rule: Joi.string(),
    legal_form: Joi.required(),
    legal_form: Joi.string(),
    company_name_arabic: Joi.required(),
    company_name_english: Joi.string(),
    hq_governorate: Joi.required(),
    hq_city: Joi.required(),
    hq_address: Joi.required(),
    hq_address: Joi.string(),
    hq_telephone: Joi.string(),
    hq_fax: Joi.string(),
    capital_currency: Joi.required(),
    capital: Joi.required(),
    capital: Joi.number(),
    investor_name: Joi.required(),
    investor_name: Joi.string(),
    nationality: Joi.required(),
    investor_id_type: Joi.required(),
    investor_id_number: Joi.required(),
    investor_id_number: Joi.string(),
    investor_gender: Joi.string(),
    investor_birth_date: Joi.required(),
    investor_birth_date: Joi.date(),
    investor_address: Joi.required(),
    investor_address: Joi.string(),
    investor_telephone: Joi.string(),
    investor_fax: Joi.string(),
    investor_email: Joi.string()
  }

  return Joi.validate(spc, schema)
}

module.exports = router
