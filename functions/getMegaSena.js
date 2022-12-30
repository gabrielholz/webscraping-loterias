import * as pup from "puppeteer";


const url = "https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx";


async function scrapingLastNumbersMegaSena() {
  const browser = await pup.launch({ headless: true, args: ['--no-sandbox'], timeout:0 }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina

  await page.goto(url);

  const allResultsSelector = '#wp_resultados';
  await page.waitForSelector(allResultsSelector).then(()=>{}); // espere pelo seletor
//   await page.waitForTimeout(1000);


const data = await page.evaluate(() => {
    let concurso = document.querySelector("#wp_resultados").getElementsByClassName("ng-binding")[0].innerText;
    let dezenas = [
        document.querySelector('#wp_resultados').getElementsByTagName("ul")[1].getElementsByTagName("li")[0].innerText,
        document.querySelector('#wp_resultados').getElementsByTagName("ul")[1].getElementsByTagName("li")[1].innerText,
        document.querySelector('#wp_resultados').getElementsByTagName("ul")[1].getElementsByTagName("li")[2].innerText,
        document.querySelector('#wp_resultados').getElementsByTagName("ul")[1].getElementsByTagName("li")[3].innerText,
        document.querySelector('#wp_resultados').getElementsByTagName("ul")[1].getElementsByTagName("li")[4].innerText,
        document.querySelector('#wp_resultados').getElementsByTagName("ul")[1].getElementsByTagName("li")[5].innerText,
    ]

    return {concurso, dezenas};
  });



//    console.log(data);
//   saveFirestore(data);

  //   }

  await page.waitForTimeout(2000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa
  return data;
}



export { scrapingLastNumbersMegaSena };
