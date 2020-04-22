import { Router } from 'express';

import { LocationController } from '../controllers/location.controller';

const {
    allCountries, allStates, allCities,
    statesByCountry, citiesByCountry, citiesByState
} = new LocationController();

const router = Router();

// Middleware that is specific to this router
router.use((req, res, next) => {
    // Log for all requests
    console.log('Router: API: Location: Request made');
    next();
});

// Country Routes
router.get('/countries', (req, res) => allCountries(req, res));

// State Routes
router.get('/states/:country', (req, res) => statesByCountry(req, res));
router.get('/states', (req, res) => allStates(req, res));

// City Routes
// router.get('/cities/byCountry/:country', (req, res) => citiesByCountry(req, res));
// router.get('/cities/byState/:state', (req, res) => citiesByState(req, res));
// router.get('/cities', (req, res) => allCities(req, res));

export const locationRouter = router;