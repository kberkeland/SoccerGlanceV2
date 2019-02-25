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

// GET route to select a league from available leagues
router.get('/', (req, res) => {

    let teamUrl = `${LEAGUES_URL}?api_token=${API_KEY}&include=country`;

    getApiStats(teamUrl, req.params.teamid).then((newResult) => {
        // console.log(newResult.data);
        let dataToSend = [];

        for( let league of newResult.data ) {
            if( !league.is_cup ) {
                dataToSend.push(league);
            }
        }
        
        console.log(dataToSend);
        res.send(dataToSend);
    }).catch((newError) => {
        console.log(`New error with stats: ${newError}`);
        res.sendStatus(500);
    });
    
}); // end of GET route for stats
    
    
async function getApiStats(urlIn, teamidIn) {
    let response = await axios.get(urlIn);
    return response.data;
}

module.exports = router;