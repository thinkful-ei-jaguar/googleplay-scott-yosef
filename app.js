const express =  require('express');
const morgan = require('morgan');

const app =  express();

app.use(morgan('dev'));

const storeData = require('./playstore.js');




app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});

