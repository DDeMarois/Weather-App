import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    try {
      const weatherData = await WeatherService.getWeatherForCity(city);
      await HistoryService.saveCity(city);
      return res.json(weatherData);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
  });
  // TODO: GET weather data from city name
  router.get('/:city', async (req, res) => {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    try {
      const weatherData = await WeatherService.getWeatherForCity(city);
      return res.json(weatherData);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
  });
  // TODO: save city to search history
router.post('/history', async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    await HistoryService.saveCity(city);
    return res.status(201).json({ message: 'City saved to history' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save city to history' });
  }
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    const history = await HistoryService.getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  try {
    await HistoryService.removeCity(id);
    return res.status(200).json({ message: 'City deleted from history' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete city from history' });
  }
});
export default router;
