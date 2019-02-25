const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// constant variables for use in API url setup
const LEAGUES_URL = 'https://soccer.sportmonks.com/api/v2.0/leagues/';
const TEAMS_URL = 'https://soccer.sportmonks.com/api/v2.0/teams/season/';
const API_KEY = process.env.SPORTSMONKS_API;
const SEASONS_ID = '12962';

router.get('/:seasonId', (req, res) => {

    let teamUrl = `${TEAMS_URL}${req.params.seasonId}?api_token=${API_KEY}`;

    getApiStats(teamUrl).then((newResult) => {
        console.log(newResult.data);
        res.send(newResult.data);
    }).catch((newError) => {
        console.log(`New error with stats: ${newError}`);
        res.sendStatus(500);
    });

}); // end of GET route for stats

checkMyTeams = () => {

}

async function getApiStats(urlIn) {

    let response = await axios.get(urlIn);
    return response.data;

}

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;