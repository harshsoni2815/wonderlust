const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listings : Joi.object({
          title:Joi.string().max(30).required(),
          price:Joi.number().min(0).required(),
          country:Joi.string().required(),
          description:Joi.string().required(),
          location:Joi.string().required(),
          image:Joi.string().allow("",null)
    }).required()
});

module.exports.ReviewSchema =Joi.object({
  review:Joi.object({
    rating:Joi.number().max(5).min(1).required(),
    comment:Joi.string().required()
  }).required()
 
})