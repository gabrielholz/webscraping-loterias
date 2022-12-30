import {
  identificaUltimoConcurso,
  scrapingLastNumbersMegaSena,
  scrapingSpecificNumbersMegaSena
} from "./functions/getMegaSena.js";

// await scrapingLastNumbersMegaSena().then(() => {
// console.log('retornou')
// });

await identificaUltimoConcurso().then((response) => {
  console.log("retornou ao index")
  scrapingSpecificNumbersMegaSena(response);
});
