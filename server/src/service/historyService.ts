import { promises as fs } from 'fs';
import * as path from 'path';

class City {
  constructor(public id: string, public name: string) {}
}

class HistoryService {
  async getHistory(): Promise<City[]> {
    return await this.read();
  }

  async saveCity(city: City): Promise<void> {
    await this.addCity(city);
  }

  private async read(): Promise<City[]> {
    const filePath = path.join(__dirname, 'searchHistory.json');
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async write(cities: City[]): Promise<void> {
    const filePath = path.join(__dirname, 'searchHistory.json');
    const data = JSON.stringify(cities, null, 2);
    await fs.writeFile(filePath, data, 'utf-8');
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(city: City): Promise<void> {
    const cities = await this.read();
    cities.push(city);
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
