import * as pup from "puppeteer";

import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { dbFirestore } from "../services/firebaseConfig.js";

const url = "https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx";

async function scrapingLastNumbersMegaSena() {
  const browser = await pup.launch({
    headless: true,
    args: ["--no-sandbox"],
    timeout: 0,
  }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina

  await page.goto(url).then(() => console.log("Navegou para a pagina..."));

  const allResultsSelector = "#wp_resultados";
  await page.waitForSelector(allResultsSelector).then(() => {}); // espere pelo seletor
  //   await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    let concurso = document
      .querySelector("#wp_resultados")
      .getElementsByClassName("ng-binding")[0].innerText;
    let dezenas = [
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[0].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[1].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[2].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[3].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[4].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[5].innerText,
    ];

    let concursoSplit = concurso.split(" ");
    let numeroConcurso = concursoSplit[1];
    let dataConcurso = concursoSplit[2].replace("(", "").replace(")", "");

    return { concurso, numeroConcurso, dataConcurso, dezenas };
  });

  async function saveFirestore(data) {
    // /loterias/megasena/jogos
    const route = doc(
      dbFirestore,
      "loterias",
      "megasena",
      "jogos",
      data.numeroConcurso
    );

    await setDoc(route, data);
  }

  saveFirestore(data);

  await page.waitForTimeout(2000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa
  return data;
}

async function identificaUltimoConcurso() {
  const browser = await pup.launch({
    headless: false,
    args: ["--no-sandbox"],
    timeout: 0,
  }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina

  await page.goto(url).then(() => console.log("Navegou para a pagina..."));

  const allResultsSelector = "#wp_resultados";
  await page.waitForSelector(allResultsSelector).then(() => {}); // espere pelo seletor
  //   await page.waitForTimeout(1000);

  const concurso = await page.evaluate(() => {
    let concurso = document
      .querySelector("#wp_resultados")
      .getElementsByClassName("ng-binding")[0].innerText;

    let concursoSplit = concurso.split(" ");
    let numeroConcurso = concursoSplit[1];
    let dataConcurso = concursoSplit[2].replace("(", "").replace(")", "");

    return { numeroConcurso };
  });

  let valor = parseInt(concurso.numeroConcurso) 
  // scrapingSpecificNumbersMegaSena(valor.toString());

  await page.waitForTimeout(2000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa
  return (valor.toString()); 
}

async function _scrapingSpecificNumbersMegaSena(concurso) {
  const browser = await pup.launch({
    headless: false,
    args: ["--no-sandbox"],
    timeout: 0,
  }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina

  await page.goto(url).then(() => console.log("Navegou para a pagina..."));

  const allResultsSelector = "#wp_resultados";

  await page.waitForSelector(allResultsSelector).then(() => {});

  await page.type('#buscaConcurso', concurso)// função para escrever, primeiro argumento é o seletor, e segundo é o que quer escrever/pesquisar


  //puppeteer tem um problema com as esperas por navegação. Então nesse caso especifico,
  // quando vc clica em algum elemento e ele faz uma nova navegação ele pede para que escreva
  // da maneira como a promise abaixo
  await Promise.all([ 
      page.keyboard.press('Enter')// clica no botão de buscar 
  ])




  // await page.waitForSelector(allResultsSelector).then(() => {}); // espere pelo seletor
  //   await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    console.log('entrou no data')
    let concurso = document
      .querySelector("#wp_resultados")
      .getElementsByClassName("ng-binding")[0].innerText;
    let dezenas = [
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[0].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[1].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[2].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[3].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[4].innerText,
      document
        .querySelector("#wp_resultados")
        .getElementsByTagName("ul")[1]
        .getElementsByTagName("li")[5].innerText,
    ];

    
    let concursoSplit = concurso.split(" ");
    let numeroConcurso = concursoSplit[1];
    let dataConcurso = concursoSplit[2].replace("(", "").replace(")", "");

    return { concurso, numeroConcurso, dataConcurso, dezenas };
  });
  console.log('saiu do data')

  async function saveFirestore(data) {
    // /loterias/megasena/jogos
    const route = doc(
      dbFirestore,
      "loterias",
      "megasena",
      "jogos",
      data.numeroConcurso
    );

    await setDoc(route, data);
  }

  saveFirestore(data);

  await page.waitForTimeout(2000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa
  return data;
}


async function scrapingSpecificNumbersMegaSena(concurso) {
  const browser = await pup.launch({
    headless: false,
    args: ["--no-sandbox"],
    timeout: 0,
  }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina

  await page.goto(url).then(() => console.log("Navegou para a pagina..."));

  const allResultsSelector = "#wp_resultados";

  await page.waitForSelector(allResultsSelector).then(() => {});


  for(let i = parseInt(concurso); i > 2500; i--){
   
    await page.waitForSelector(allResultsSelector).then(() => {});
    await page.type('#buscaConcurso', '')
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.type('#buscaConcurso', i.toString())// função para escrever, primeiro argumento é o seletor, e segundo é o que quer escrever/pesquisar


    //puppeteer tem um problema com as esperas por navegação. Então nesse caso especifico,
    // quando vc clica em algum elemento e ele faz uma nova navegação ele pede para que escreva
    // da maneira como a promise abaixo
    await Promise.all([ 
        page.keyboard.press('Enter')// clica no botão de buscar 
    ])
  
  
  
  
    await page.waitForSelector(allResultsSelector).then(() => {}); // espere pelo seletor
    //   await page.waitForTimeout(1000);
  
    const data = await page.evaluate(() => {
      console.log('entrou no data')
      let concurso = document
        .querySelector("#wp_resultados")
        .getElementsByClassName("ng-binding")[0].innerText;
      let dezenas = [
        document
          .querySelector("#wp_resultados")
          .getElementsByTagName("ul")[1]
          .getElementsByTagName("li")[0].innerText,
        document
          .querySelector("#wp_resultados")
          .getElementsByTagName("ul")[1]
          .getElementsByTagName("li")[1].innerText,
        document
          .querySelector("#wp_resultados")
          .getElementsByTagName("ul")[1]
          .getElementsByTagName("li")[2].innerText,
        document
          .querySelector("#wp_resultados")
          .getElementsByTagName("ul")[1]
          .getElementsByTagName("li")[3].innerText,
        document
          .querySelector("#wp_resultados")
          .getElementsByTagName("ul")[1]
          .getElementsByTagName("li")[4].innerText,
        document
          .querySelector("#wp_resultados")
          .getElementsByTagName("ul")[1]
          .getElementsByTagName("li")[5].innerText,
      ];
  
      
      let concursoSplit = concurso.split(" ");
      let numeroConcurso = concursoSplit[1];
      let dataConcurso = concursoSplit[2].replace("(", "").replace(")", "");
  
      return { concurso, numeroConcurso, dataConcurso, dezenas };
    });
  
  
    async function saveFirestore(data) {
      // /loterias/megasena/jogos
      const route = doc(
        dbFirestore,
        "loterias",
        "megasena",
        "jogos",
        data.numeroConcurso
      );
  
      await setDoc(route, data);
      
    }
  
    await saveFirestore(data).then(()=>{console.log("Salvou concurso: ", data.concurso)});
    await page.waitForTimeout(500)
  }
  

  await page.waitForTimeout(2000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa
  return;
}

export { scrapingLastNumbersMegaSena, identificaUltimoConcurso, scrapingSpecificNumbersMegaSena };
