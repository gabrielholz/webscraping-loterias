// let dados = require('./data.json')

async function compareOdds(data) {
  for (let i = 0; i < data.length; i++) {
    let dataGame = data[i];
    for (let j = 0; j < dataGame.length; j++) {
      // let prob_time_casa = parseFloat((100/parseFloat(dataGame[j].oddCasa)).toFixed(2));
      // let prob_time_fora = parseFloat((100/parseFloat(dataGame[j].oddFora)).toFixed(2));

      let a_prob_time_casa = parseFloat(
        (100 / parseFloat(dataGame[j].oddCasa)).toFixed(2)
      );
      let a_prob_time_fora = parseFloat(
        (100 / parseFloat(dataGame[j].oddFora)).toFixed(2)
      );

      for (let k = 0; k < dataGame.length; k++) {
        let b_prob_time_casa = parseFloat(
          (100 / parseFloat(dataGame[k].oddCasa)).toFixed(2)
        );
        let b_prob_time_fora = parseFloat(
          (100 / parseFloat(dataGame[k].oddFora)).toFixed(2)
        );

        if (a_prob_time_casa + b_prob_time_fora < 100) {
          console.log(`
                        Oportunidade em: ${dataGame[k].timeCasa} x ${
            dataGame[k].timeFora
          }
                        Casa: ${a_prob_time_casa} -> ${dataGame[j].betting}
                        Fora: ${b_prob_time_fora} -> ${dataGame[k].betting}
                        Lucro: ${100 - b_prob_time_fora - a_prob_time_casa}
                    `);
        }
      }

      for (let k = 0; k < dataGame.length; k++) {
        let b_prob_time_casa = parseFloat(
          (100 / parseFloat(dataGame[k].oddCasa)).toFixed(2)
        );
        let b_prob_time_fora = parseFloat(
          (100 / parseFloat(dataGame[k].oddFora)).toFixed(2)
        );

        if (b_prob_time_casa + a_prob_time_fora < 100) {
          console.log(`
                        Oportunidade em: ${dataGame[k].timeCasa} x ${
            dataGame[k].timeFora
          }
                        Casa: ${b_prob_time_casa} -> ${dataGame[j].betting}
                        Fora: ${a_prob_time_fora} -> ${dataGame[k].betting}
                        Lucro: ${100 - a_prob_time_fora - b_prob_time_casa}
                    `);
        }
      }

      // console.log(`${prob_time_casa} vs ${prob_time_fora}`)
    }
  }

  // {
  //     id: 21,
  //     timeCasa: 'SÃO JOSÉ CAMPOS',
  //     timeFora: 'FLAMENGO RJ',
  //     betting: 'ComeOn',
  //     oddCasa: '6.00',
  //     oddFora: '1.09'
  //   },

  return;
}

// compareOdds(dados)

async function compareOddsOneGame(data) {
//   console.log(data);
  let dataGame = data;
  async function leitura() {
    for (let j = 0; j < data.length; j++) {
      // let prob_time_casa = parseFloat((100/parseFloat(data[j].oddCasa)).toFixed(2));
      // let prob_time_fora = parseFloat((100/parseFloat(data[j].oddFora)).toFixed(2));

      let a_prob_time_casa = parseFloat(
        (100 / parseFloat(data[j].oddCasa)).toFixed(2)
      );
      let a_prob_time_fora = parseFloat(
        (100 / parseFloat(data[j].oddFora)).toFixed(2)
      );

      for (let k = 0; k < data.length; k++) {
        let b_prob_time_casa = parseFloat(
          (100 / parseFloat(data[k].oddCasa)).toFixed(2)
        );
        let b_prob_time_fora = parseFloat(
          (100 / parseFloat(data[k].oddFora)).toFixed(2)
        );

        if (a_prob_time_casa + b_prob_time_fora < 100) {
          console.log(`
                    Oportunidade em: ${data[k].timeCasa} x ${data[k].timeFora}
                    Casa: ${a_prob_time_casa} -> ${data[j].betting}
                    Fora: ${b_prob_time_fora} -> ${data[k].betting}
                    Lucro: ${100 - b_prob_time_fora - a_prob_time_casa}
                `);
        }
      }

      for (let k = 0; k < data.length; k++) {
        let b_prob_time_casa = parseFloat(
          (100 / parseFloat(data[k].oddCasa)).toFixed(2)
        );
        let b_prob_time_fora = parseFloat(
          (100 / parseFloat(data[k].oddFora)).toFixed(2)
        );

        if (b_prob_time_casa + a_prob_time_fora < 100) {
          console.log(`
                    Oportunidade em: ${data[k].timeCasa} x ${data[k].timeFora}
                    Casa: ${b_prob_time_casa} -> ${data[j].betting}
                    Fora: ${a_prob_time_fora} -> ${data[k].betting}
                    Lucro: ${100 - a_prob_time_fora - b_prob_time_casa}
                `);
        }
      }

      // console.log(`${prob_time_casa} vs ${prob_time_fora}`)
    }
  }

  await leitura();
  return;
}

export {
  compareOdds,
  compareOddsOneGame,
};
