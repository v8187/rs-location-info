import { Schema } from 'mongoose';

export class BaseSchema extends Schema {

    constructor(def, options) {
        super(Object.assign(def), { ...options });
    }
}

export const commonShemaOptions = (fnTransform) => {
    const tempTransform = (doc, ret, options) => {
        ret = commonTransform(doc, ret, options);
        return fnTransform ? fnTransform(doc, ret, options) : ret;
    };

    return {
        id: false,
        toObject: {
            virtuals: true,
            transform: tempTransform
        },
        toJSON: {
            virtuals: true,
            transform: tempTransform
        }
    };
};