const axios = require('axios')
const Company = require('../models/company')

const stripeKey = require('../config/keys').stripeKey
const stripe = require("stripe")(stripeKey)

exports.charge = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
    if (!company) {
      return res.status(404).send({ error: "No such company" })
    }
    if (!company.fees || company.fees === 0) {
      return res.status(400).send({ error: "Fees not specified" })
    }
    if (company.ispaid) {
      return res.status(400).send({ error: "Payment already made" })
    }
    if (!req.body.token) {
      return res.status(400).send({ error: "Missing token" })
    }
    
    const charge = await stripe.charges.create({
      amount: company.fees * 100,
      currency: 'egp',
      source: req.body.token,
      description: "Company establishment fees - " + company.company_name_arabic + "/" + company.company_name_english
    })
    
    try {
      const newCompany = await Company.findByIdAndUpdate(req.params.id, { ispaid: true }, { new: true })
      res.json({ charge: charge, company: newCompany })
    } catch (err) {
      const refund = await stripe.refunds.create({
        charge: 'ch_SctTB5rpclOjFjnGeFwJ'
      });
      console.log(err)
      return res.sendStatus(500)
    }
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}