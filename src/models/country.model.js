import { model } from 'mongoose';

import { BaseSchema } from './BaseSchema';

const CountrySchema = new BaseSchema(
    {
        alphaCode3: String,
        name: String,
        alphaCode2: String
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
    return this.find().sort('name').exec();
};

export const CountryModel = model('Country', CountrySchema);