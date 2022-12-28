const pup = require('puppeteer');
const compareFunctions = require("./compare");

const url = "https://oddspedia.com/br/basquete/";
// const url = "https://oddspedia.com/br/beisebol/"
const searchFor = "macbook";


async function searchOdds() {

    let dataGames = []
    let list = [];

    const browser = await pup.launch({ headless: false });// inicializar o navegador
    const page = await browser.newPage();// criar uma nova pagina
    console.log('iniciei')

    await page.goto(url);// redirecionar para a URL escolhida
    console.log("fui para a url")

    await page.waitForSelector('.match')// espere pelo seletor

    const links = await page.$$eval('.match > a', el => el.map(link => link.href))// vai executar o document.querySelectorAll dentro da pagina que está


    // for(let i=0; i< links.length; i++) {
    for (let i = 0; i < 20; i++) {
        console.log('Página: ', links[i])// mostra em qual pagina que está indo
        await page.goto(links[i])
        await page.waitForSelector('.eoc-table__row')

        const dataGame = await page.evaluate(() => {

            let listaDados = []
            const el = document.querySelectorAll('.eoc-table__row');

            let contador = 1;
            el.forEach((item) => {
                let id = contador;
                let obj = {}
                obj.id = id;

                obj.timeCasa = document?.querySelectorAll('.event-header-matchinfo__title')[0]?.getElementsByTagName('span')[0]?.innerText;
                obj.timeFora = document?.querySelectorAll('.event-header-matchinfo__title')[0]?.getElementsByTagName('span')[4]?.innerText;
                let betting_ = (document?.querySelectorAll('.eoc-table__row')[contador]?.getElementsByClassName('eoc-table__row__bookmaker')[0]?.getElementsByTagName('span')[0]?.innerText)?.replaceAll("\n", '')?.replaceAll(" ", '');
                obj.betting = betting_

                obj.oddCasa = (document.querySelectorAll('.eoc-table__row')[contador]?.getElementsByClassName('bookmaker-link')[0]?.innerText)?.replaceAll("\n", '')?.replaceAll(" ", '');
                obj.oddFora = (document.querySelectorAll('.eoc-table__row')[contador]?.getElementsByClassName('bookmaker-link')[1]?.innerText)?.replaceAll("\n", '')?.replaceAll(" ", '');

                listaDados.push(obj)
                contador += 1;
            })




            return (listaDados)

        })



        compareFunctions.compareOddsOneGame(dataGame).then(()=>{
            console.log('then')
            dataGames.push(dataGame)
        })
        


    }


    // console.log(list)

    await page.waitForTimeout(3000);//esperar por determinado tempo
    await browser.close();// sempre que usar o browsor, tem que fechar depois de finzalizar a pesauisa


    return dataGames;
}

module.exports = {
    searchOdds
}