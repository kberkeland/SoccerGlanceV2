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

router.post('/', (req,res) => {
    console.log(req.body);
    let queryText = `INSERT INTO "sm_my_teams" ("name", "team_id", "person_id")
                     VALUES ($1, $2, $3);`;
    pool.query(queryText,[req.body.name, req.body.team_id, req.body.person_id]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        // error message and console log for unable to add to database
        console.log(`Error in POST route for add a team: ${error}`);
        res.sendStatus(500);
    });
});

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