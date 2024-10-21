import dotenv from 'dotenv';
import axios from 'axios';
import dayjs from 'dayjs';
dotenv.config();
// Import axios to make our http requests to the OpenWeatherMap API
// Allow us to pull variables from .env file with process.env
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Assign the properties baseURL and apiKey using process.env
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
    }
    // async fetchLocationData(city: string) {
    //   const url = this.baseURL + `/weather?units=imperial&q=${city}&appid=${this.apiKey}`;
    //   const res = await axios.get(url);
    //   console.log('SOMETHING', res.data)
    //   return res.data;
    // }
    // TODO: Create fetchLocationData method
    async getForecastWeatherForCity(city) {
        // Create the url variable using this.baseURL + '/forecast', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
        const url = this.baseURL + `/forecast?units=imperial&q=${city}&appid=${this.apiKey}`;
        // Make a fetch request to OpenWeatherMap using the url above constructed above
        const res = await axios.get(url);
        // Please console.log res.data so you can see how the returned data is structured - The 5 day forecast will be provided to you in an array of 40 objects. Each object represents a 3-hour segment of time. 
        console.log(res.data);
        // return the array of of 40 weather objects
        // BONUS: filter the array of 40 objects down to just objects that have a dt_txt that includes '12:00'
        const filtered = res.data.list.filter((weatherObj) => {
            if (weatherObj.dt_txt.includes('12:00')) {
                return weatherObj;
            }
            return false;
        });
        const weatherData = filtered.map((weatherObj) => {
            return {
                city: city,
                date: dayjs(weatherObj.dt * 1000).format('MM/DD/YYYY'),
                icon: weatherObj.weather[0].icon,
                iconDescription: weatherObj.weather[0].description,
                tempF: weatherObj.main.temp,
                windSpeed: weatherObj.wind.speed,
                humidity: weatherObj.main.humidity
            };
        });
        return weatherData;
    }
    // TODO: Complete getCurrentWeatherForCity method
    async getCurrentWeatherForCity(city) {
        console.log('HELLOHELLO', process.env.API_BASE_URL);
        const url = this.baseURL + `/weather?units=imperial&q=${city}&appid=${this.apiKey}`;
        const res = await axios.get(url);
        const data = {
            city: res.data.name,
            // this is completed for you as an example
            date: dayjs(res.data.dt * 1000).format('MM/DD/YYYY'),
            icon: res.data.weather[0].icon,
            iconDescription: res.data.weather[0].description,
            tempF: res.data.main.temp,
            windSpeed: res.data.wind.speed,
            humidity: res.data.main.humidity
        };
        return data;
    }
}
export default new WeatherService();
