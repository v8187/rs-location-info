import { model, } from 'mongoose';

import { BaseSchema, commonShemaOptions } from './BaseSchema';

const StateSchema = new BaseSchema(
    {
        stateId: Number,
        name: String,
        countryId: String,
    },
    { collection: 'State' });

// State Schema's virtual fields
StateSchema.virtual('country', {
    ref: 'Country',
    localField: 'countryId',
    foreignField: 'alphaCode3',
    justOne: true
});

/*
 * Add Custom static methods
 * =========================
 * 
 * Do not declare methods using ES6 arrow functions (=>). 
 * Arrow functions explicitly prevent binding this
 */
StateSchema.statics.list = function () {
    return this.find()
        .populate('country', 'alphaCode3 name -_id').sort('name')
        .select('-_id -__v').exec();
};

StateSchema.statics.byCountry = function (countryId) {
    return this
        .find({ countryId: new RegExp(countryId, 'i') })
        .sort('name').select('-_id')
        .exec();
};

export const StateModel = model('State', StateSchema);