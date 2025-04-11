import { Router }  from 'express'

import { tokenMiddle } from '../../utils/tokens.js'
import { httpViewPlanet, httpViewPlanetUpdate, httpUpgradeBuilding } from './planets.controller.js';

const planetsRoute = Router();

planetsRoute.use(tokenMiddle);

planetsRoute.get('/view/:planetId', httpViewPlanet);
planetsRoute.get('/view/update/:planetId', httpViewPlanetUpdate);

planetsRoute.post('/upgrade/building/:planetId', httpUpgradeBuilding)

export default planetsRoute;