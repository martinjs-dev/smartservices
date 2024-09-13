import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiBookService {
  async getBook(): Promise<any> {
    // const city = await this.getCity();
    try {
      const response = await axios.get(
        `https://openlibrary.org/people/mekBot/books/want-to-read.json`,
      );
      return response.data.reading_log_entries;
    } catch (error) {
      throw new Error(`API not available: ${error.message}`);
    }
  }
}
