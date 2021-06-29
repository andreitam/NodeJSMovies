const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const https = require('https');
var moment = require('moment'); 
const databaseModule = require('../utils/database');

const database = databaseModule();

router.get('/movies', async (req, res) => {
    const getMoviesSqlQuery = `
        select * from si.movies
    `

    try {
        const results =  await database.query(getMoviesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.get('/director', async (req, res) => {
    const getDirectorsSqlQuery = `
        select * from si.director
    `

    try {
        const results =  await database.query(getDirectorsSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.get('/director/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);

    const getMoviesByDirectorSqlQuery = `
        select * from si.movies where director_id = ${id}
    `

    try {
        const results =  await database.query(getMoviesByDirectorSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.delete('/movies/:id', async (req,res) => {
    console.log('delete route')
    const {id} = req.params;
    console.log(id);

    const deleteMoviesSqlQuery = `delete from si.movies
    where imdbID='${id}'
    `
    try {
        const results =  await database.query(deleteMoviesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});

router.put('/movies/:id', async (req,res) => {
    const {id} = req.params;
    console.log('id visible', id);

    // 1. connect to db
    const {
        title,
        released,
        actors
    } = req.body;
    const sqlReleased = moment(released).format("YYYY-MM-DD");
    console.log(sqlReleased);
    console.log('title', title, '\n', 'released', released, '\n', 
    'actors', actors, '\n');
    
    const updateMoviesSqlQuery = `UPDATE si.movies SET released = '${sqlReleased}', actors = '${actors}' WHERE imdbID='${id}'`;
    
    try {
        const results =  await database.query(updateMoviesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }

});

module.exports = router;
