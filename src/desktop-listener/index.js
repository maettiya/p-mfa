const { startBLEScan } = require('./ble');
const { createAPI } = require('./api');

const api = createAPI(5454);
api.start();

startBLEScan((device) => {
  console.log('Detected device:', device);
  api.updateScan(device);
});
