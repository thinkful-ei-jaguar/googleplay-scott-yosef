const express =  require('express');
const morgan = require('morgan');

const app =  express();

//use morgan in the 'dev' setting
app.use(morgan('dev'));

//import the data from playstore
const storeData = require('./playstore.js');

app.get('/apps', (req, res) => {
  //deconstruct req.query.sort and req.query.genres
  const {sort, genres} = req.query;

  //make a copy of app data to edit
  let filteredApps = [...storeData]
  
  //this is the accepted params for Genres
  const acceptedGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  //make sure Genres query has a value of one of the accepted params
  if(genres) {
    if(!acceptedGenres.includes(genres)){
      return res.status(400).json({ error: "Genres must be one of: Action, Puzzle, Strategy, Casual, Arcade, Card "});
    }
      //using the copied app data(you don't want to use the original imported data)filter for each app, check that the Genres key matches the req.query.genres value and assign the new array as filteredApps
    filteredApps = filteredApps.filter(eachApp => eachApp.Genres.includes(genres))
  }

  //if req.query.sort is not equal to 'Rating' or 'App' throw an error
  if(sort) {
    if(sort !== 'Rating' && sort !== 'App'){
      return res.status(400).json({ error: "Sort must be one of: 'Rating' or 'App'" });
    }
    //return either 1, to leave it on the right, or a -1, to reverse the order, or 0 to leave as is if identical
    //1 | -1
    //[]use bracket notation to handle dynamic data
    filteredApps.sort((a, b) => {
      return a[sort] < b[sort] ? -1 : 1;
    });
  }

  res.json(filteredApps);
});


app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});

