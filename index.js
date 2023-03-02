// Write your answer here
const fs = require("fs");
const axios = require("axios");

const FILE_DATA_PATH = "./data/transactions.csv";

fs.readFile(FILE_DATA_PATH, "UTF-8", async function (err, data) {
  const [id,, fsym, value] = data
    .split("\n")
    .filter((el) => el)
    .slice(-1)[0]
    .split(",");

  await axios
    .get(`https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=USD`)
    .then((res) => {
      let oneTokenPrice = res.data.USD;
      console.log(`Latest portfolio value №${id} is equal to ${oneTokenPrice*value}`)
    })
    .catch((err) => console.log("err", err));
});
