import { BaseController } from './BaseController';
import { CountryModel } from '../models/country.model';
import { StateModel } from '../models/state.model';
// import { CityModel } from '../models/city.model';
import { handleModelRes } from '../utils/handlers';

export class LocationController extends BaseController {

    allCountries(req, res) {
        handleModelRes(CountryModel.list(), res);
    }

    allStates(req, res) {
        handleModelRes(StateModel.list(), res);
    }

    // allCities(req, res) {
    //     handleModelRes(CityModel.list(), res);
    // }

    statesByCountry(req, res) {
        handleModelRes(StateModel.byCountry(req.params.country), res);
    }

    // citiesByCountry(req, res) {
    //     handleModelRes(CityModel.byCountry(req.params.country), res);
    // }

    // citiesByState(req, res) {
    //     handleModelRes(CityModel.byState(req.params.state), res);
    // }
}