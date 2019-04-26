const Joi=require('joi')
const AppError= require('./app_erro')
const validateParams = (query, schema) => {

    const {error, value} = Joi.validate(query, schema);
    if (error !== null) {
        throw new AppError({
            code: 1001,
            msg: error.details[0].message
        });
    }
    return value
};
module.exports = validateParams