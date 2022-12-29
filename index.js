//Constantes
// const express = require('express');
import express from "express";

// const bodyParser = require('body-parser');
import bodyParser from "body-parser";
import cors from "cors";
// const cors = require('cors');
import { scrapingLastNumbersMegaSena } from "./functions/getMegaSena.js";
import { headers } from "./configHeader.js";

// const cors = require('cors');
// Seus domínios permitidos devem estar aqui
const allowedOrigins = [
  "http://localhost:3000",
  "https://megasena.devholz.com/",
  "http://10.0.0.22:3000",
];
const corsOption = {
  origin: allowedOrigins,
};
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(headers)

//Routes
app.post("/getmegasena", async (req, res) => {
  // console.log(req.body)
  // res.send(JSON.stringify(`Com o valor de ${req.body.price} você consegue comprar várias coisas`));
  let data = {};

  await scrapingLastNumbersMegaSena().then((response) => {
    data = { response };
  });

  res.send(JSON.stringify(data));
});

app.get("/getteste", async (req, res) => {
  let data = { name: "Gabriel", company: "devholz" };

  return res.json(data);
});

//Start server
let port = process.env.PORT || 3009;
app.listen(port, (req, res) => {
  console.log("Servidor Rodando ", port);
});
