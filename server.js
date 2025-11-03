const express = require('express');
const bodyParser = require('body-parser');
let lastCommand = "";

const app = express();
app.use(bodyParser.json());

// Endpoint for ESP32 to poll
app.get('/getCommand', (req, res) => {
  res.json({ command: lastCommand });
  lastCommand = ""; // Clear after sending
});

// Endpoint for Telegram Webhook
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  if (message && message.text) {
    lastCommand = message.text;
    console.log(`Command received: ${message.text}`);
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Command relay running on port ${PORT}`);
});
