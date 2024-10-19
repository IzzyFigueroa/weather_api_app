import { Router, Request, Response } from 'express';
const router = Router();

import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {

  // Use the weatherService object to retrieve both current weather and forecast weather for the city the user searched for
  // const cityName = req.body.cityName;
  // req.body.cityName is the city value that the user searched for in the browser form input
  const currentData = await weatherService.getCurrentWeatherForCity(req.body.cityName);
  
  // Create a variable forecastData that stores the forecast data, using the weatherService.getForecastWeatherForCity()
  const forecastData = await weatherService.getForecastWeatherForCity(req.body.cityName);

  // Create a variable weatherData that stores an array of the currentData as the first item and forecastData as the second item
  const weatherData = [currentData, forecastData];

  // TODO: save city to search history
  // Use the historyService.addCity() to store the searched city into our db.json - use req.body.cityName to get the city the user searched for
  await historyService.addCity(req.body.cityName);

  res.json(weatherData);

});

// // TODO: GET search history

// Use the historyService.getCities() to retreive the cities array of objects
router.get('/history', async (_: Request, res: Response) => {
  
    const cities = await historyService.getCities();
    res.json(cities);
  
  // Send back a json response of the city object array
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  await historyService.removeCity(req.params.id);
  res.status(204).send();
  // Use the historyService.removeCity() to remove a city by id 
  // You can use req.params.id to get the id of the city the user wants to remove
});

export default router;
