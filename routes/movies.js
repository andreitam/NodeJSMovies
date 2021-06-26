const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 

router.get('/movies', (req, res) => {
    const movieName = req.query.name;
    console.log(movieName);
    var movieObject = {};
    https.get('https://www.omdbapi.com/?t='+movieName+'&apikey=d5e2f2b', (resp) => {
        let data = '';  
         // A chunk of data has been received.
          resp.on('data', (chunk) => {
              data += chunk;
          });
      
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              console.log(JSON.parse(data).explanation);
              movieObject = JSON.parse(data);
              console.log(movieObject);
              res.json(movieObject); 
              // 1. connect to db
        const {
            Title,
            Actors,
            Director,
            Poster,
            imdbRating,
            imdbID
        } = movieObject;
        const imdb_link = `https://www.imdb.com/title/${imdbID}/`;
        const Year = moment(movieObject.Year).format("YYYY-MM-DD");
        console.log('after destruct', movieObject);
        console.log(Title,Year);
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        })

        connection.connect(function (err) {
            if (err) {
                console.error('Connection to DB failed');
                return;
            }
            console.log("Connected to the database!");
            //2. query movies table
            const insertMoviesSqlQuery = `insert into si.movies(imdbID, released, title, actors, director, poster, imdb_link, imdbRating)
            values('${imdbID}', '${Year}', '${Title}', '${Actors}', '${Director}', '${Poster}', '${imdb_link}', '${imdbRating}' )`
            console.log(insertMoviesSqlQuery);
            connection.query(insertMoviesSqlQuery, function (err, results) {
                if (err) {
                    console.error(err);
                    // res.json({
                    //     success: false
                    // });
                    // connection.release();
                    return;
                }
                console.log("Result: " + results);
                // res.json({
                //     success: true
                // });
                // connection.release();
            });
        });
          });
          }).on("error", (err) => {
          console.log("Error: " + err.message);
      });
      
});

router.delete('/movies/:id', (req,res) => {
    const {id} = req.params;
    console.log(id);

    // 1. connect to db
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const deleteMoviesSqlQuery = `delete from si.movies
        where imdbID='${id}'
        `
        connection.query(deleteMoviesSqlQuery, function (err, results) {
            // if query was successfully done, err is null 
            if (err) {
                console.error(err);
                res.json({
                    success: false
                });
                // connection.release();
                return;
            }
            console.log("Result: " + results);
            res.json({
                success: true
            });
            // connection.release();
        });
    });
});

router.put('/movies/:id', (req,res) => {
    const {id} = req.params;
    console.log('id visible', id);

    // 1. connect to db
    const {
        title,
        released,
        actors,
        director
    } = req.body;
    const sqlReleased = moment(released).format("YYYY-MM-DD");
    console.log(sqlReleased);
    console.log('title', title, '\n', 'released', released, '\n', 
    'actors', actors, '\n', 'director', director, '\n');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const updateMoviesSqlQuery = `UPDATE si.movies SET released = '${sqlReleased}', actors = '${actors}', director = '${director}' WHERE imdbID='${id}'`;
        connection.query(updateMoviesSqlQuery, function (err, results) {
            // if query was successfully done, err is null 
            if (err) {
                console.error(err);
                res.json({
                    success: false
                });
                // connection.release();
                return;
            }
            console.log("Result: " + results);
            res.json({
                success: true
            });
            // connection.release();
        });
    });
});

module.exports = router;

