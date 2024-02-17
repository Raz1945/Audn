const express = require('express')
const router = express.Router()


// Testeo que haya conexcion http://localhost:3000/ping
router.get('/ping', (_req, res) => {
  console.log('ROUTES: someone pinged here!! ');
  res.send('pong pong');
});


module.exports = router;

