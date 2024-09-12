import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiNewsService {
  private apiNewsUrl =
    'https://newsapi.org/v2/everything?q=Monde&apiKey=e1ed11560f84472d8a8a69e1a2d67cae';

  async getNews(): Promise<any> {
    try {
      const response = await axios.get(this.apiNewsUrl);
      return response.data;
    } catch (error) {
      throw new Error(`API not available: ${error.message}`);
    }
  }
}
