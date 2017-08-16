'use strict';

const express = require('express'),
      path = require('path');

const app = express(),
      PORT = process.env.PORT || 80;

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`App is listening at http://${address}:${port}`);
});
