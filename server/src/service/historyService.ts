// Import fs promises version to read and write to our db.json file
import { promises as fs } from 'fs';
import { v4 } from 'uuid';

class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = v4();
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a private read method that reads from the db.json file - this method will only be accessible within the HistoryService class
  private async read() {
    // Use fs to read the db.json file
    const rawData = await fs.readFile('searchHistory.json', 'utf-8')
    // Using fs will give you unparsed JSON data array
    return JSON.parse(rawData);
    // return the parsed array - ie. JSON.parse(rawArray);
  }

  // TODO: Define a write method that writes the updated cities array to the db.json file
  private async write(cities: City[]) {
    await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, 2));
    // Use fs to overwrite the db.json file with the stringified array of city objects
  }

  // TODO: Define a get method that returns an array of city objects, using the read method to retrieve the array from db.json
  async getCities() {
    // Get the array of cites, using the read method
    const cityArray = await this.read();

    return cityArray;
  };




  // TODO Define an addCity method that adds a city to the db.json file
  async addCity(city: string) {
    // Get the array of city objects from db.json, using this.read
    const citiesArray = await this.getCities();
    if (citiesArray.find((c: City) => c.name === city)) {
      return;
    }
    const newCity = new City(city);
    citiesArray.push(newCity);
    await this.write(citiesArray);
  }

  // First use citiesArray.find() to check if there is already a city object matching the city name
  // If there is, return without continuing the rest of the code below


  // Create a city variable that stores a new City object - Pass in the city parameter as an argument

  // Push the new city object to the citiesArray above

  // Use this.write to overwrite the db.json file with our new array of city objects
}

// * BONUS TODO: Define a removeCity method that removes a city from the db.json file
// async removeCity(id: string) {
//   // Get the cities array
//   const citiesArray = await this.getCities();

//   // Filter out the city object within citiesArray that has an id matching the id above - ie. citiesArray.filter(() => {})

//   // console.log a confirmation that the city has been removed
// }
// }

export default new HistoryService();
