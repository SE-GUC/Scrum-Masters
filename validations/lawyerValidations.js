const Joi = require('Joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            telephone: Joi.number().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().max(30),
            email: Joi.string().email(),
            password: Joi.string().min(8),
            telephone: Joi.number()
        }

        return Joi.validate(request, updateSchema)
    },
}