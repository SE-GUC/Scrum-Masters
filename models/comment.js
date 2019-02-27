const uuid = require('uuid')

class comment {
    constructor(comment_text,comment_date,application_id,user_id) {
        this.comment_text = comment_text;
        this.comment_date = comment_date;
        this.comment_id = uuid.v4();
        this.application_id=application_id;
        this.user_id=user_id ;// the one who commented
    };
};

module.exports = comment;