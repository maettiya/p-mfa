const noble = require('@abandonware/noble');

function startBLEScan(onDeviceFound) {
  noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
      console.log('BLE powered on. Scanning...');
      noble.startScanning([], true); // [] = all services, true = duplicates allowed
    } else {
      noble.stopScanning();
    }
  });

  noble.on('discover', (peripheral) => {
    const { localName } = peripheral.advertisement;

    onDeviceFound({
      id: peripheral.id,
      name: localName,
      rssi: peripheral.rssi,
      address: peripheral.address,
    });
  });
}

module.exports = { startBLEScan };
