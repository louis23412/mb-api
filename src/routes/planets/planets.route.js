import { Router }  from 'express'

import { checkToken } from '../../utils/tokens.js'
import { httpViewPlanet, httpViewPlanetUpdate, httpUpgradeBuilding } from './planets.controller.js';

const planetsRoute = Router();

planetsRoute.use((req, res, next) => {
    if (req.session.token) {
        const isValidToken = checkToken(req.session.token);

        if (!isValidToken) {
            return res.status(401).json({
                error : 'access denied'
            })
        }
    } else if (!req.session.token) {
        return res.status(401).json({
            error : 'access denied'
        })
    }

    // TODO: Check if valid planetId format here:

    next();
})

planetsRoute.get('/view/:planetId', httpViewPlanet);
planetsRoute.get('/view/update/:planetId', httpViewPlanetUpdate);

planetsRoute.post('/upgrade/building/:planetId', httpUpgradeBuilding)

export default planetsRoute;