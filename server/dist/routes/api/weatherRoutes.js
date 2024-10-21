import { Router } from 'express';
const router = Router();
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    const currentData = await weatherService.getCurrentWeatherForCity(req.body.cityName);
    const forecastData = await weatherService.getForecastWeatherForCity(req.body.cityName);
    const weatherData = [currentData, forecastData];
    await historyService.addCity(req.body.cityName);
    res.json(weatherData);
});
// // TODO: GET search history
router.get('/history', async (_, res) => {
    const cities = await historyService.getCities();
    res.json(cities);
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    await historyService.removeCity(req.params.id);
    res.status(204).send();
});
export default router;
