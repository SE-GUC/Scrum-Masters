const Joi = require('joi')
const Notification = require('../models/Notification')



function validateNotificationCreate (notification,creating) {
    
        const schema = {
        owner_id: Joi.string().required(),
        object_type: Joi.string().required(),
        object_id: Joi.string().required(),
        notif_text: Joi.string().max(50).required(),
        viewed:Joi.boolean().required(),
        date:Joi.date().required()
        }
    return Joi.validate(notification, schema)
  }

  function validateNotificationUpdate (notification,creating) {
    
    const schema = {
        owner_id: Joi.string(),
        object_type: Joi.string(),
        object_id: Joi.string(),
        notif_text: Joi.string().max(50),
        viewed:Joi.boolean(),
        date:Joi.date()
    }
return Joi.validate(notification, schema)
}

exports.getallnotifications = async (req,res) => {
    try{
    const notifications = await Notification.find()
    res.json({data: notifications})
    }
    catch(error){
        console.log(error)
    }
}

exports.getnotification = async(req, res) => {
    try{
     const notification =await Notifications.findById(req.params.id)
    if(!notification)
     return res.status(404).send('Notification with this ID was not found')
     res.send(notification)
    }
    catch (error) {
        console.log(error)
      }
}





exports.createnotification = async(req, res) => {
    try {
        const { error } = validateNotificationCreate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const notification = await Notification.create(req.body)
        res.json({msg:'notification was created successfully', data: notification})
       }
       catch(error) {
           console.log(error)
       }  
}

exports.updatenotification= async (req, res) => {

    try {
        const { error } = validateNotificationUpdate(req.body)
        
        if (error) return res.status(400).send(error.details[0].message)
    
        const notification = await ElectronicJournal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
        if (!notification) return res.status(404).send(`The electronicJournal with this ID was not found.`)
    
        res.json({ msg: 'notification  updated successfully', data: notification })
      } catch (error) {
        console.log(error)
      }






}

exports.deletenotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndRemove(req.params.id)
    
        if (!notification) return res.status(404).send('notification with this ID was not found.')
    
        res.json({ msg: 'notification deleted successfully', data: notification })
      } catch (error) {
        console.log(error)
      }
}