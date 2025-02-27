import axios from 'axios';
import * as cheerio from 'cheerio';

interface PlantInfo {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

async function scrapePlantInfo(url: string): Promise<PlantInfo[]> {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const $ = cheerio.load(data);
    const plants: PlantInfo[] = [];

    $('.product-item').each((index, element) => {
      const name = $(element).find('.product-title').text().trim();
      const description = $(element).find('.product-description').text().trim();
      const price = $(element).find('.product-price').text().trim();
      const imageUrl = $(element).find('.product-image img').attr('src') || '';

      plants.push({ name, description, price, imageUrl });
    });

    return plants;
  } catch (error) {
    console.error('Error scraping plant info:', error);
    return [];
  }
}

(async () => {
//   const url = 'https://www.burpee.com/eggplant-black-beauty-prod000706.html';
  const url = 'https://bonnieplants.com/products/juliet-roma-grape-tomato'
  const plantInfo = await scrapePlantInfo(url);
  console.log(JSON.stringify(plantInfo, null, 2));
})();