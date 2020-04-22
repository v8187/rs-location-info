import { CountryModel } from '../models/country.model';

const docs = [
    { countryId: 'BRA', name: 'Brazil', webId: 'BR', latitude: -10, longitude: -55 },
    { countryId: 'CHN', name: 'China', webId: 'CN', latitude: 35, longitude: 105 },
    { countryId: 'FRA', name: 'France', webId: 'FR', latitude: 47, longitude: 2 },
    { countryId: 'IND', name: 'India', webId: 'IN', latitude: 28.47, longitude: 77.03 },
    { countryId: 'USA', name: 'USA', webId: 'US', latitude: 38, longitude: -97 }
];

CountryModel.insertMany(docs, (err, docs) => {
    if (err) {
        console.error('CountryModel.insertMany: Failed', err);
        return false;
    }
    console.log('%d Countries added successfully!!!', docs.length);
});

/* CountryModel
    .find()
    .then(docs => {
        console.log(docs);
    })
    .catch(error => {
        console.log(error);
    }); */