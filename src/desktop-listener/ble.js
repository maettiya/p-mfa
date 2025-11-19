// Bluetooth Low Energy SCAN FOR MY PHONE SPECIFICALLY

const noble = require('@abandonware/noble');

const printedIDs = new Set();

// CHANGE THIS to your phone's name
const YOUR_PHONE_NAME = "is this the kosher meal?";

function startBLEScan(onDeviceFound) {
  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      console.log("BLE powered on. Scanning only for YOUR PHONE...");
      noble.startScanning([], true);
    } else {
      noble.stopScanning();
    }
  });

  noble.on('discover', (peripheral) => {
    const name = peripheral.advertisement.localName;

    // Ignore ALL devices except your phone
    if (name !== YOUR_PHONE_NAME) return;

    const device = {
      id: peripheral.id,
      name,
      rssi: peripheral.rssi,
    };

    // Only print ONCE per rotated BLE ID
    if (!printedIDs.has(peripheral.id)) {
      printedIDs.add(peripheral.id);
      console.log("📱 YOUR PHONE:", device);
    }

    // Still send updates to the system
    onDeviceFound(device);
  });
}

module.exports = { startBLEScan };

// BASIC Bluetooth Low Energy SCAN FOR EVERYTHING

// const noble = require('@abandonware/noble');

// function startBLEScan(onDeviceFound) {
//   noble.on('stateChange', async (state) => {
//     if (state === 'poweredOn') {
//       console.log('BLE powered on. Scanning...');
//       noble.startScanning([], true); // [] = all services, true = duplicates allowed
//     } else {
//       noble.stopScanning();
//     }
//   });

//   noble.on('discover', (peripheral) => {
//     const { localName } = peripheral.advertisement;

//     onDeviceFound({
//       id: peripheral.id,
//       name: localName,
//       rssi: peripheral.rssi,
//       address: peripheral.address,
//     });
//   });
// }

// module.exports = { startBLEScan };
