const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const npmPath = path.join(__dirname, './node_modules');
const browserPath = path.join(__dirname, './browser');
const PORT = process.env.PORT || 3003;
const bodyParser = require('body-parser');


const accountSid = process.env.twilioSid;
const authToken = process.env.twilioAuthToken;

const client = require('twilio')(accountSid, authToken);
// MIDDLEWARE LOGGER
app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static('public'));
app.use(express.static(npmPath));
app.use(express.static(browserPath));

//require the Twilio module and create a REST client

app.post('/:word/:number', function (req, res, next) {
  client.messages.create({
      to: '+17188736102',
      from: "+17326074968",
      body: "Stop saying the word " + req.params.word + ". You've said it " + req.params.number + " times already."
  }, function(err, message) {
      console.log(message.sid);
  });
  res.status(201).send();
})
app.listen(PORT, function () {
    console.log('Server is listening on port ' + PORT);
})

