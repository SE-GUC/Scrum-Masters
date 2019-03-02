const uuid = require('uuid')
// Create Comment

class comment {
  constructor (comment_text, user_id, application_id) {
    this.comment_text = comment_text
    this.comment_date = new Date()
    this.comment_id = uuid.v4()
    this.application_id = application_id
    this.user_id = user_id// the one who commented
  };
};

module.exports = comment
