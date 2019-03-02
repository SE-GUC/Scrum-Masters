const uuid = require('uuid')

class Notification {
  constructor (owner_id, object_type, object_id, notif_text) {
	  this.id = uuid.v4();
	  this.owner_id = owner_id;
	  this.object_type = object_type;
	  this.object_id = object_id;
	  this.notif_text = notif_text;
	  this.viewed = false;
  };
};

module.exports = Notification
