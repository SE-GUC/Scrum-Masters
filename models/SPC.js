const uuid = require('uuid')

class SPC {
  constructor (organizational_rule, legal_form, company_name_arabic, company_name_english, hq_governorate, hq_city, hq_address, hq_telephone,
    hq_fax, capital_currency, capital, investor_name, investor_gender, nationality, investor_id_type, investor_id_number,
    investor_birth_date, investor_address, investor_telephone, investor_fax, investor_email) {
    this.id = uuid.v4()
    this.organizational_rule = organizational_rule
    this.legal_form = legal_form
    this.company_name_arabic = company_name_arabic
    this.company_name_english = company_name_english
    this.hq_governorate = hq_governorate
    this.hq_city = hq_city
    this.hq_address = hq_address
    this.hq_telephone = hq_telephone
    this.hq_fax = hq_fax
    this.capital_currency = capital_currency
    this.capital = capital
    this.investor_name = investor_name
    this.investor_gender = investor_gender
    this.nationality = nationality
    this.investor_id_type = investor_id_type
    this.investor_id_number = investor_id_number
    this.investor_birth_date = investor_birth_date
    this.investor_address = investor_address
    this.investor_telephone = investor_telephone
    this.investor_fax = investor_fax
    this.investor_email = investor_email
  };
};

module.exports = SPC
