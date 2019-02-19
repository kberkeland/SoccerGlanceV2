const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// constant variables for use in API url setup
const BASE_URL = 'https://api.sportradar.us/soccer-xt3/eu/en/';
const API_KEY = process.env.API_KEY;

router.post('/', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "teams" (")`

}); // end POST to user teams

// Tournaments info
// https://api.sportradar.us/soccer-xt3/eu/en/tournaments.json?api_key=

// Specific tournament info
// https://api.sportradar.us/soccer-xt3/eu/en/tournaments/sr:tournament:17/info.json?api_key=

// Team info
// https://api.sportradar.us/soccer-xt3/eu/en/tournaments/sr:tournament:17/teams/sr:competitor:48/statistics.json?api_key=

// GET route to select team data from Sportradar.us API after login
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "teams";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    //     console.log(result.rows);
            // axios request to the sportradar.us API
            // console.log(`In teams GET route`);
            // axios({
            //     method: `GET`,
            //     url: `${BASE_URL}tournaments/sr:tournament:17/info.json?api_key=${API_KEY}`
            // }).then((response) => {
            //     // loop through the teams in the response
            //     let arrayIn = [];
            //     for(let fixArray of response.data.groups) {
            //         arrayIn.push(fixArray.teams);
            //         // console.log(`Action payload: ${test.teams.name}`);
            //     }
            //     // let flatArray = newArray.flat();
            //     res.send(arrayIn.flat());
            // }).catch((axiosError) => {
            //     // console log and client error message for axios request
            //     console.log(`Error in axios GET request for team data: ${axiosError}`);
            //     res.sendStatus(500);
            // });
    }).catch((poolError) => {
        // console log and client message for error
        console.log(`GET error for teams in database sql: ${poolError}`);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;