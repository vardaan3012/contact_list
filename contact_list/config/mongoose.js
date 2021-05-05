//require the library
const mongoose = require('mongoose');


//connect the database
mongoose.connect('mongodb://localhost/contacts_list', {useNewUrlParser: true, useUnifiedTopology: true});


//acquire the connection(to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//up nd running then print the message
db.once('open', function() {
  console.log('successfully connected to the database');
});