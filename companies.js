const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
 //just SPC to check for any development to be applied to SSC
const company = require('../../models/SPC');


const companies = [{
    organizational_rule : 'msh 3aref',
    legal_form  : 'msh 3aref bardo',
    company_name_arabic  : 'زا سكرام ماسترز', //Unique??
    company_name_english : 'The scrum masters',
    hq_governorate : 'Cairo',
    hq_city : 'Madinet Nasr,Sheraton feat el tagamo3',
    hq_address : '02 c3 third floor',
    hq_telephone : '01010101010',
    hq_fax :'7777777',
    capital_currency : 'EGP',
    capital : '400',
    investor_name : 'Ibrahim mohamed sayed',
    investor_gender : 'Unspecified',
    nationality : 'Mexican',
    investor_id_type : "Mexican?",
    investor_id_number =  '11111111111111',
    investor_birth_date = '13/7/1900',
    investor_address :'Brazil, Rio, makram ebeid',
    investor_telephone : '999999999',
    investor_fax : '2993298',
    investor_email =   'Ibrahim_hima@Cameron.org',
},
{
    organizational_rule : 'msh 3aref1',
    legal_form  : 'msh 3aref bardo 2',
    company_name_arabic  : '2زا سكرام ماسترز', //Unique??
    company_name_english : 'The scrum masters2',
    hq_governorate : 'Cairo',
    hq_city : 'Madinet Nasr,Sheraton feat el tagamo3',
    hq_address : '02 c6 first floor',
    hq_telephone : '01010101010',
    hq_fax :'7777777',
    capital_currency : 'EGP',
    capital : '50',
    investor_name : 'Shaaban mohamed sayed',
    investor_gender : 'Unspecified',
    nationality : 'Mexican',
    investor_id_type : "Mexican?",
    investor_id_number =  '11111111111111',
    investor_birth_date = '13/7/1901',
    investor_address :'Brazil, Rio, Abbas',
    investor_telephone : '999999999',
    investor_fax : '2993298',
    investor_email =   'Shaaban_shebo@Cameron.org',
}
]



router.post('/',(req,res)=>{
    const organizational_rule = req.body.organizational_rule
    const legal_form = req.body.legal_form
    const company_name_arabic = req.body.company_name_arabic 
    const company_name_english = req.body.company_name_english
    const hq_governorate = req.body.hq_governorate
    const hq_city = req.body.hq_city
    const hq_address = req.body.hq_adress
    const hq_telephone = req.body.hq_telephone
    const hq_fax = req.body.hq_fax
    const capital_currency= req.body.capital_currency
    const capital = req.body.capital
    const investor_name = req.body.investor_name
    const investor_gender = req.body.investor_gender
    const nationality = req.body.nationality
    const investor_id_type = req.body.investor_id_type
    const investor_id_number = req.body.investor_id_number
    const investor_birth_date = req.body.investor_birth_date
    const investor_address = req.body.investor_address
    const investor_telephone = req.body.investor_telephone
    const investor_fax = req.body.investor_fax
    const investor_fax = req.body.investor_fax

    const schema = {
        organizational_rule= Joi.string().required(),
        legal_form = Joi.string().required(),
        company_name_arabic = Joi.string().required(), //Unique??
        company_name_english = Joi.string().required(),
        hq_governorate = Joi.string().alphanum().required(),
        hq_city = Joi.string().alphanum().required(),
        hq_address = Joi.object().keys({
            Building_number = Joi.string().required(),
            Street = Joi.string().required(),
        }),
        hq_telephone = Joi.string().min(10).max(11).required(),
        hq_fax = Joi.string().min(7).max(7).required(),
        capital_currency = Joi.string().required(),
        capital = Joi.number().min(100000).required(),
        investor_name = Joi.object().keys({
           first_name = Joi.string().required(),
           Middle_name = Joi.string().required(),
           Last_name = Joi.string.required(),
        }),
        investor_gender = Joi.string().required(),
        nationality = Joi.string().required(),
        investor_id_type = Joi.string().required(),
        investor_id_number =  Joi.string().min(14).max(14).required(),
        investor_birth_date = Joi.date().format().required(),
        investor_address = Joi.object().keys({
            Country = Joi.string().required(),
            city = Joi.string().required(),
            Street = Joi.string().required(),
        }),
        investor_telephone = Joi.string().required(),
        investor_fax = Joi.string().required(),
        investor_email =   Joi.string().email().required(),
    
    }

    const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    
    const New_company = {
        organizational_rule,
        legal_form,
        company_name_arabic,
        company_name_english,
        hq_governorate,
        hq_city,
        hq_address,
        hq_telephone,
        hq_fax,
        capital_currency,
        capital,
        investor_name,
        investor_gender,
        nationality,
        investor_id_type,
        investor_id_number,
        investor_birth_date,
        investor_address,
        investor_telephone,
        investor_fax,
        investor_email
    }
    return res.json({data:New_company})
})


//Since the company name is unique
router.get('/:company_name',(req,res) =>{
    const name = req.params.company_name
    const company = companies.find(company => company.company_name_english === name)
    res.send(company)
})


//Updating?? -> We can take all the attributes for now and then the specified update, can be handled through the front end??? wla ehh msh 3areff
router.put('/:company_name',(req,res) =>{
    const name = req.params.company_name
    const updated_info = req.body

})

router.delete('/:company_name',(req,res) =>{
    const name = req.params.company_name
    const company = companies.find(company => company.company_name_english === name)
    const pos = indexof(company)
    companies.splice(index,1)
    res.send(companies)
})

module.exports = router