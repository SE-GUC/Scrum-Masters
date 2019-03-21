const Joi = require("joi");
const Company = require("../models/company");

function validateCompany(company) {
  const schema = {
    company_type: Joi.string().required(),
    organizational_rule: Joi.string().required(),
    legal_form: Joi.string().required(),
    company_name_arabic: Joi.string().required(),
    company_name_english: Joi.string(),
    hq_governorate: Joi.required(),
    hq_city: Joi.required(),
    hq_address: Joi.string().required(),
    hq_telephone: Joi.string(),
    hq_fax: Joi.string(),
    capital_currency: Joi.string().required(),
    capital: Joi.number()
      .min(50000)
      .required(),
    investor_name: Joi.string().required(),
    nationality: Joi.required(),
    investor_id_type: Joi.string().required(),
    investor_id_number: Joi.string().required(),
    investor_gender: Joi.string(),
    investor_birth_date: Joi.date().required(),
    investor_address: Joi.string().required(),
    investor_telephone: Joi.string(),
    investor_fax: Joi.string(),
    investor_email: Joi.string()
  };
  if (company.company_type === "ssc") {
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
    });
  }

  return Joi.validate(company, schema);
}

exports.listAllCompanies = (req, res) => {
  Company.find({}, { _id: true })
    .then(company => {
      return res.json(company);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.getCompany = (req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      if (!company) return res.status(404).send("company not found");
      return res.json(company);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.createCompany = (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Company.findOne(
    { company_name_arabic: req.body.company_name_arabic } || {
      company_name_english: req.body.company_name_english
    }
  )
    .then(company => {
      if (company)
        return res
          .status(400)
          .send("An application is already created with this company name");

      company = {};
      company = req.body;
      Company.create(company)
        .then(company => {
          return res.json(company);
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.updateCompany = (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(company => {
      if (!company) return res.status(404).send("application not found");
      return res.json(company);
    })
    .catch(err => {
      04;
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.deleteCompany = (req, res) => {
  Company.findByIdAndRemove(req.params.id)
    .then(company => {
      if (!company) return res.status(404).send("application not found");
      return res.json(company);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};
