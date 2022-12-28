// const pup = require('puppeteer');
import * as pup from "puppeteer";
// const compareFunctions = require("./compare");
import * as compareFunctions from "./compare.js";
import { doc, setDoc, collection } from "firebase/firestore";
import { dbFirestore } from "../services/firebaseConfig.js";

// const url = "https://oddspedia.com/br/basquete/";
// const url = "https://oddspedia.com/br/beisebol/"
const searchFor = "macbook";

async function scrapingOdds(url) {
  const browser = await pup.launch({ headless: false }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina

  await page.goto(url);

  await page.waitForSelector(".match"); // espere pelo seletor

  const linksMatches = await page.$$eval(".match > a", (el) =>
    el.map((link) => link.href)
  );

  for (let i = 0; i < linksMatches.length; i++) {
    let linkMatch = linksMatches[i];
    console.log(linkMatch);
    await page.goto(linkMatch); // redirecionar para a URL escolhida
    // await page.waitForSelector('.event-header-matchinfo__title')
    // await page.waitForSelector('.event-body__title')// espera carregar a aba de odds
    await page.waitForTimeout(10000);
    await page.waitForSelector('.eoc-table__row')
    // let verify = document.querySelectorAll('.eoc-not-found').length;

    // if (verify != false) {
    //     console.log('tepo para pegar as odds expirado')
    // } else {
      const eventAllData = await page.evaluate(() => {
        let dataEvent = [];
        let listBettingOdds = [];

        const tableOdds = document.querySelectorAll(".eoc-table__row");

        tableOdds.forEach((item, index) => {
          // console.log(index)
          // let id = contador;
          let obj = {};
          obj.id = index;
          obj.betting = document
            ?.querySelectorAll(".eoc-table__row")
            [index]?.getElementsByClassName("eoc-table__row__bookmaker")[0]
            ?.getElementsByTagName("span")[0]
            ?.innerText?.replaceAll("\n", "")
            ?.replaceAll(" ", "");

          obj.data = obj.oddCasa = document
            .querySelectorAll(".eoc-table__row")
            [index]?.getElementsByClassName("bookmaker-link")[0]
            ?.innerText?.replaceAll("\n", "")
            ?.replaceAll(" ", "");
          obj.oddFora = document
            .querySelectorAll(".eoc-table__row")
            [index]?.getElementsByClassName("bookmaker-link")[1]
            ?.innerText?.replaceAll("\n", "")
            ?.replaceAll(" ", "");

          listBettingOdds.push(obj);
          // contador += 1;
        });

        let obj = {};

        let homeTeam = document
          ?.querySelectorAll(".event-header-matchinfo__title")[0]
          ?.getElementsByTagName("span")[0]?.innerText;
        let awayTeam = document
          ?.querySelectorAll(".event-header-matchinfo__title")[0]
          ?.getElementsByTagName("span")[4]?.innerText;
        let dateEvent = document
          .querySelectorAll(".event-start-date")[0]
          .innerText?.replaceAll("\n", "")
          ?.replaceAll(" ", "")
          .replace("º", ",");
        let idEvent = `${homeTeam}_${awayTeam}_${dateEvent
          .replaceAll(",", "_")
          .replaceAll(":", "_")}`;

        obj.homeTeam = homeTeam;
        obj.awayTeam = awayTeam;
        obj.dateEvent = dateEvent;
        obj.idEvent = idEvent;

        obj.listBettingOdds = listBettingOdds;

        dataEvent.push(obj);
        return dataEvent;
      });

      let data = { linkEvent: linkMatch, ...eventAllData[0] };
      // console.log(data)

      async function saveFirestore(data) {
        const route = doc(collection(dbFirestore, "jogos"));

        await setDoc(route, data);
      }

      saveFirestore(data);
    }
//   }

  await page.waitForTimeout(5000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa
  return 1;
}

async function _scrapingOdds(url) {
  let dataGames = [];
  let list = [];

  const browser = await pup.launch({ headless: false }); // inicializar o navegador
  const page = await browser.newPage(); // criar uma nova pagina
  console.log("iniciei");

  await page.goto(url); // redirecionar para a URL escolhida
  console.log("fui para a url");

  await page.waitForSelector(".match"); // espere pelo seletor

  const links = await page.$$eval(".match > a", (el) =>
    el.map((link) => link.href)
  ); // vai executar o document.querySelectorAll dentro da pagina que está

  // for(let i=0; i< links.length; i++) {
  for (let i = 0; i < 20; i++) {
    console.log("Página: ", links[i]); // mostra em qual pagina que está indo
    await page.goto(links[i]);
    await page.waitForSelector(".eoc-table__row");

    const dataGame = await page.evaluate(() => {
      let listaDados = [];
      const el = document.querySelectorAll(".eoc-table__row");

      let contador = 1;
      el.forEach((item) => {
        let id = contador;
        let obj = {};
        obj.id = id;

        obj.timeCasa = document
          ?.querySelectorAll(".event-header-matchinfo__title")[0]
          ?.getElementsByTagName("span")[0]?.innerText;
        obj.timeFora = document
          ?.querySelectorAll(".event-header-matchinfo__title")[0]
          ?.getElementsByTagName("span")[4]?.innerText;
        let betting_ = document
          ?.querySelectorAll(".eoc-table__row")
          [contador]?.getElementsByClassName("eoc-table__row__bookmaker")[0]
          ?.getElementsByTagName("span")[0]
          ?.innerText?.replaceAll("\n", "")
          ?.replaceAll(" ", "");
        obj.betting = betting_;
        obj.data = document.querySelectorAll(".event-start-date")[0].innerText;

        obj.oddCasa = document
          .querySelectorAll(".eoc-table__row")
          [contador]?.getElementsByClassName("bookmaker-link")[0]
          ?.innerText?.replaceAll("\n", "")
          ?.replaceAll(" ", "");
        obj.oddFora = document
          .querySelectorAll(".eoc-table__row")
          [contador]?.getElementsByClassName("bookmaker-link")[1]
          ?.innerText?.replaceAll("\n", "")
          ?.replaceAll(" ", "");

        listaDados.push(obj);
        contador += 1;
      });

      return listaDados;
    });

    compareFunctions.compareOddsOneGame(dataGame).then(() => {
      console.log("then");
      dataGames.push(dataGame);
    });
  }

  // console.log(list)

  await page.waitForTimeout(3000); //esperar por determinado tempo
  await browser.close(); // sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa

  return dataGames;
}

export { scrapingOdds };
