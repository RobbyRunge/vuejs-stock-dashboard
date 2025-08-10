import axios from 'axios';

class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/42cp5if516wlb'
    });
  }

  async fetchData(sheetName) {
    try {
      const response = await this.apiClient.get(`?sheet=${sheetName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  async getAllData(sheetName) {
    return await this.fetchData(sheetName);
  }
}

export const stockService = new StockService();