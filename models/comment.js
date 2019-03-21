var mongoose= require('mongoose')
var Schema = mongoose.Schema

//Comment schema.

var commentSchema=new Schema({
  comment_text:{
    type:String,
    required:true
  },
 comment_date:{
    type:Date
  },
 application_id:{
   type:Schema.ObjectId,
   required:true,
   ref:'company'
 },
 user_id:{
   type:Schema.ObjectId,
   required:true,
   ref:'user'  // to be user.
 }
})

var comment = mongoose.model('comment',commentSchema)

module.exports = comment
