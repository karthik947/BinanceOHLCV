const rp = require('request-promise');
const bottleneck = require('bottleneck');
const _ = require('lodash');
const config = require('./config.js');
const fs = require('fs');
const csv = require('fast-csv');
const log = console.log;

const getReqArray = ({ symbol, fromTS, toTS, timeframe, tfw }) => {
  const barw = tfw[timeframe];
  const n = Math.ceil((toTS - fromTS) / (1000 * barw));
  return _.times(n, (i) => {
    const startTS = fromTS + i * 1000 * barw;
    return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&startTime=${startTS}&limit=1000`;
  });
};

//Limit to 15 requests per sec, which translates to 900 requests per minute (way below the rate limit)
const limiter = new bottleneck({
  reservoir: 15, // initial value
  reservoirRefreshAmount: 15,
  reservoirRefreshInterval: 1 * 1000,
  maxConcurrent: 15,
  minTime: 80,
});

const getKline = async (url) => {
  try {
    return JSON.parse(await rp(url));
  } catch (e) {
    log(e);
    return [];
  }
};

const wrapKline = limiter.wrap(getKline);

// Business Logic
const download = async () => {
  const {
    symbol,
    timeframe,
    fromTS,
    toTS,
    fileName,
    tfw,
  } = config.getPrameters();
  const reqA = getReqArray({ symbol, fromTS, toTS, timeframe, tfw });
  log(`Total No. API Requests to process => ${reqA.length}`);
  log(`Initiating download...`);
  const header = [
    ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'QuoteVolume'],
  ];
  const results = [
    ...header,
    ..._.flatten([
      ...(await Promise.all(reqA.map((item) => wrapKline(item)))),
    ]).filter(k => k[0] <= toTS).map((k) => [
      new Date(k[0]).toLocaleString('en-GB'),
      k[1],
      k[2],
      k[3],
      k[4],
      k[5],
      k[7],
    ]),
  ];
  //Save to csv file
  const ws = fs.createWriteStream(fileName);
  csv
    .write(results, { headers: true })
    .pipe(ws)
    .on('finish', () =>
      log(`Candlestick data has been downloaded to ${fileName}`)
    );
};

download();
