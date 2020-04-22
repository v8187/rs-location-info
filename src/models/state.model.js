import { model, } from 'mongoose';

import { BaseSchema, commonShemaOptions } from './BaseSchema';

const StateSchema = new BaseSchema(
    {
        stateId: Number,
        name: String,
        countryId: String,
        latitude: Number,
        longitude: Number
    },
    { collection: 'State' });

// State Schema's virtual fields
StateSchema.virtual('country', {
    ref: 'Country',
    localField: 'countryId',
    foreignField: 'countryId',
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
        .populate('country', 'countryId name -_id')
        .select('-_id -__v').exec();
};

StateSchema.statics.byCountry = function (countryId) {
    return this
        .find({ countryId: new RegExp(countryId, 'i') })
        .select('stateId name countryId -_id')
        .exec();
};

export const StateModel = model('State', StateSchema);