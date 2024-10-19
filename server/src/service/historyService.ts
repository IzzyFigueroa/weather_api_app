
import { promises as fs } from 'fs';
import { v4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

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

  private dbFilePath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.dbFilePath = path.join(__dirname, '../../db/searchHistory.json');
  }

  private async read(): Promise<City[]> {

    const rawArray = await fs.readFile(this.dbFilePath, 'utf-8');
    const cityArray: City[] = JSON.parse(rawArray)

    return cityArray;

  }

  // TODO: Define a write method that writes the updated cities array to the db.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile(this.dbFilePath, data, 'utf-8');

    } catch (error) {
      console.log('Error writing this file');
      throw error;
    }
  }

  async getCities() {

    const cityArray = await this.read();



    return cityArray;
  };





  async addCity(city: string) {

    const citiesArray = await this.getCities();
    if (citiesArray.find((cityList: City) => cityList.name === city)) {
      return;
    }
    const newCity = new City(city);
    citiesArray.push(newCity);
    await this.write(citiesArray);
  }


  async removeCity(id: string) {

    const citiesArray = await this.getCities();


    const filterCity = citiesArray.filter((city: City) => city.id !== id);


    await this.write(filterCity);


    console.log(`City with id ${id} has been removed.`);
  }
}


export default new HistoryService();
