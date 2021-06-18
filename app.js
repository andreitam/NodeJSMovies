const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('listening on 3000');
});

const https = require('https');
var movieName = "";

app.get('/getMovies', (request, response) => {
    movieName = request.query.name;
    console.log(movieName);
    response.setHeader('Content-Type', 'application/json');
    https.get('https://www.omdbapi.com/?t='+movieName+'&apikey=d5e2f2b', (resp) => {
        let data = '';
      
         // A chunk of data has been received.
          resp.on('data', (chunk) => {
              data += chunk;
          });
      
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              console.log(JSON.parse(data).explanation);
              
              response.json(JSON.parse(data)); 
          });
          }).on("error", (err) => {
          console.log("Error: " + err.message);
      });

});

//



