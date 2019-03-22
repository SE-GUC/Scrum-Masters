const Joi = require('joi')
const CompanyRequest = require('../models/CompanyRequest')
const User = require('../models/User')

exports.getAllCompanyRequests = (req, res) => {
  CompanyRequest.find({})
    .then(companies => {
      return res.json(companies)
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.getUserCompanyRequests = (req, res) => {
  CompanyRequest.find({ investor_id: req.params.id })
    .then(companies => {
      return res.json(companies)
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.createCompanyRequest = (req, res) => {
	if (!req.body.investor_id) return res.status(400).send("Must specify investor ID")
		
	User.findById(req.body.investor_id)
		.then(user => {
			if (!user) return res.status(400).send("Invalid investor ID")
			if (user.type != 'investor') return res.status(400).send("User must be an investor")
			
			CompanyRequest.create({ investor_id: req.body.investor_id })
				.then(company => {
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

exports.assignLawyer = (req, res) => {
	if (!req.body.lawyer_id) return res.status(400).send("Must specify lawyer ID")
	
	User.findById(req.body.lawyer_id)
		.then(user => {
			if (!user) return res.status(400).send("Invalid lawyer ID")
			if (user.type != 'lawyer') return res.status(400).send("User must be a lawyer")
			
			CompanyRequest.findByIdAndUpdate(req.params.id, { lawyer_id: req.body.lawyer_id, assigned: true }, { new: true })
				.then(company => {
					if (!company) return res.status(404).send('Company request not found')
					
					// TODO: create notification for the investor
					
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

exports.deleteCompanyRequest = (req, res) => {
  CompanyRequest.findByIdAndRemove(req.params.id)
		.then(company => {
			if (!company) return res.status(404).send('Company request not found')
			return res.json({ msg: "Deleted", data: company })
		})
		.catch(err => {
			console.log(err)
			return res.sendStatus(500)
		})
}
