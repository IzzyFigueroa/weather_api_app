// import dotenv from 'dotenv';
import dayjs from 'dayjs';
// Import axios to make our http requests to the OpenWeatherMap API
import axios from 'axios';

// Allow us to pull variables from .env file with process.env
// dotenv.config();

// TODO: Complete the WeatherService class
class WeatherService {
  // Define the baseURL and API key properties
  baseURL: string;
  apiKey: string;

  constructor() {
    // TODO: Assign the properties baseURL and apiKey using process.env
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  async getForecastWeatherForCity(city: string) {
    // Create the url variable using this.baseURL + '/forecast', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
    const url = `${this.baseURL}/forecast?units=imperial&q=${city}&appid=${this.apiKey}`;

    // Make a fetch request to OpenWeatherMap using the url above constructed above
    const res = await axios.get(url);

    // Please console.log res.data so you can see how the returned data is structured - The 5 day forecast will be provided to you in an array of 40 objects. Each object represents a 3-hour segment of time. 
    console.log(res.data);
    // return the array of of 40 weather objects

    // BONUS: filter the array of 40 objects down to just objects that have a dt_txt that includes '12:00'
    return res.data.list.filter((weatherObj: any) => {
      if (weatherObj.dt_txt.includes('12:00')) {
        return weatherObj
      }
      return false;
     });
    }

  // TODO: Complete getCurrentWeatherForCity method
  async getCurrentWeatherForCity(city: string) {
    console.log(process.env.API_BASE_URL)
    console.log('base'this.baseURL)
    // Create the url variable using this.baseURL + '/weather', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
    const url = `${this.baseURL}/weather?units=imperial&q=${city}&appid=${this.apiKey}`;

    // Make a fetch request to OpenWeatherMap using the url constructed above
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch current weather data');
    }
    const resData = await res.json();

    // Create a data object from the weather data you receive
    const data = {
      city: resData.data.name, // this is completed for you as an example
      date: dayjs(resData.data.dt * 1000).format('MM/DD/YYYY'), // Use the already installed dayjs package to convert res.data.dt * 1000 into a formatted date like '10/17/2024'
      icon: resData.data.weather[0].icon,
      iconDescription: resData.data.weather[0].description,
      tempF: resData.data.main.temp,
      windSpeed: resData.data.wind.speed,
      humidity: resData.data.main.humidity
    };

    // Return the custom data object of weather information
    return data;
  }
}

// Export a constructed/instatiated object, using our WeatherService class above
export default new WeatherService();
