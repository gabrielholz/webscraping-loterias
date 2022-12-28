// let compareFunctions = require("./functions/compare");
// let scraping = require("./functions/scrapingData")
import { scrapingLastNumbersMegaSena } from './functions/getMegaSena.js';


async function start() {
  await  scrapingLastNumbersMegaSena().then(()=>{
        console.log('Retornou!')
    })
}

start();