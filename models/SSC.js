const uuid = require('uuid')

class SSC extends SPC {
    constructor(organizational_rule, legal_form, company_name_arabic, company_name_english, hq_governorate, hq_city, hq_address, hq_telephone,
				hq_fax, capital_currency, capital, investor_name, investor_type, investor_gender, nationality, investor_id_type, investor_id_number,
				investor_birth_date, investor_address, investor_telephone, investor_fax, investor_email, board_members) {
		super(organizational_rule, legal_form, company_name_arabic, company_name_english, hq_governorate, hq_city, hq_address, hq_telephone,
				hq_fax, capital_currency, capital, investor_name, investor_gender, nationality, investor_id_type, investor_id_number,
				investor_birth_date, investor_address, investor_telephone, investor_fax, investor_email);
		this.investor_type = investor_type;
		this.board_members = board_members;
    };
};

module.exports = SSC

