const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

(async () => {
  try {
    const app = express();
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
    const addr = process.env.IP || 'localhost';
    const PORT = Number(process.env.PORT) || 5000;

    app.listen(PORT, () => {
      console.log(`Server running at http://${addr}:${PORT}`);
    });
  } catch (error) {
    console.log('error starting server', error);
  }
})();
