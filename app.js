const express =  require('express');
const morgan = require('morgan');

const app =  express();

app.use(morgan('dev'));

const storeData = require('./playstore.js');

app.get('/apps', (req, res) => {
  //make a copy of app data to edit
  let filteredApps = [...storeData]
  
  //make sure Genres query has a value
  if('Genres' in req.query && !req.query.Genres) {
    return status(400).json({ error: "Genres must contain a value"})
  }

  if(req.query.genre){
    
  }
  

  if(req.query.sort){
    if(req.query.sort !== 'rating' && req.query.sort !== 'app'){
      return res.status(400).json({ error: "Sort must be one of rating or app" })
    }

    filteredApps.sort((a, b) => {
      return a[req.query.sort] < b[req.query.sort] ? -1 : 1;
    });
  }





})


app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});

