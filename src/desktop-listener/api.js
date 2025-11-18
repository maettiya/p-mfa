const express = require('express');

function createAPI(port = 5454) {
  const app = express();
  let latestScan = null;

  app.get('/status', (req, res) => {
    res.json({ status: 'running', latestScan });
  });

  return {
    start: () =>
      app.listen(port, () =>
        console.log(`Local API running on http://localhost:${port}`)
      ),
    updateScan: (scan) => {
      latestScan = scan;
    },
  };
}

module.exports = { createAPI };
