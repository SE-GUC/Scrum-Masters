const passport = require('passport')
const jwt = require("jsonwebtoken")
const tokenKey = require("../config/keys").tokenKey
const User = require("../models/User")
const Company = require("../models/company")

function getPayload(req) {
  const token = req.headers.authorization
  if (!token) return null
  return jwt.verify(token.substring(7), tokenKey)
}

async function getUser(id) {
  const user = await User.findById(id)
  return user
}

async function getCompany(id) {
  const company = await Company.findById(id)
  return company
}

exports.canViewUser = (req, res, next) => {
  const payload = getPayload(req)
  if (payload.type === 'admin' || req.params.id === payload.id) return next()
  return res.sendStatus(401)
}

exports.canAccessApplication = async (req, res, next) => {
  let id = '';
  if (req.params.id) id = req.params.id
  else if (req.params.companyid) id = req.params.companyid
  else if (req.params.app_id) id = req.params.app_id
  else if (req.params.appId) id = req.params.appId
  
  const payload = getPayload(req)
  if (payload.type !== 'investor') return next()
  
  const user = await getUser(payload.id)
  const foundId = user.companies.find(company => { return company == id })
  if (foundId) return next()
  
  return res.sendStatus(401)
}

exports.isAdmin = (req, res, next) => {
  const payload = getPayload(req)
  if (payload.type === 'admin') return next()
  return res.sendStatus(401)
}

exports.canAssignReviewer = (req, res, next) => {
  const payload = getPayload(req)
  if (payload.type === 'admin') return next()
  if (payload.type === 'reviewer' && payload.id === req.params.revId) return next()
  return res.sendStatus(401)
}

exports.canAssignLawyer = (req, res, next) => {
  const payload = getPayload(req)
  if (payload.type === 'admin') return next()
  if (payload.type === 'lawyer' && payload.id === req.params.lawyerId) return next()
  return res.sendStatus(401)
}

exports.canUnassignReviewer = async (req, res, next) => {
  const payload = getPayload(req)
  const company = await getCompany(req.params.appId)
  if (!company) return res.sendStatus(404)
  
  if (payload.type === 'admin') return next()
  if (payload.type === 'reviewer' && payload.id === company.review_reviewer) return next()
  
  return res.sendStatus(401)
}

exports.canUnassignLawyer = async (req, res, next) => {
  const payload = getPayload(req)
  const company = await getCompany(req.params.appId)
  if (!company) return res.sendStatus(404)
  
  if (payload.type === 'admin') return next()
  if (payload.type === 'lawyer' && payload.id === company.review_lawyer) return next()
  
  return res.sendStatus(401)
}

exports.canRegister = async (req, res, next) => {
  const payload = getPayload(req)
  if (payload && payload.type === 'admin') return next()
  if (!req.body.type) return next() //pass and let the controller return the error
  if (req.body.type === 'investor') return next()
  return res.sendStatus(401)
}