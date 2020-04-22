import { model } from 'mongoose';

import { BaseSchema } from './BaseSchema';

const CountrySchema = new BaseSchema(
    {
        countryId: String,
        name: String,
        webId: String,
        latitude: Number,
        longitude: Number
    },
    { collection: 'Country' });

/*
 * Add Custom static methods
 * =========================
 * 
 * Do not declare methods using ES6 arrow functions (=>). 
 * Arrow functions explicitly prevent binding this
 */
CountrySchema.statics.list = function () {
    return this.aggregate([{
        $project: { countryId: 1, name: 1, webId: 1, _id: 0 }
    }]).exec();
};

export const CountryModel = model('Country', CountrySchema);