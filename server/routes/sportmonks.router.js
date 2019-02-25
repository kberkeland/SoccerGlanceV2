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

router.get('/:personId', (req, res) => {

    let teamUrl = `${TEAMS_URL}${SEASONS_ID}?api_token=${API_KEY}&include=stats`;
    // console.log(teamUrl);
    getApiStats(teamUrl, req.params.teamid).then((newResult) => {
        // console.log(newResult.data)
        let queryText = `SELECT *
                         FROM "sm_my_teams"
                         WHERE "sm_my_teams"."person_id" = $1
                         ORDER BY "sm_my_teams"."name";`;
        pool.query(queryText, [req.params.personId]).then((result) => {
            // console.log(result.rows);
            let dataToSend = [];

            for(let team of newResult.data) {
                for(let myTeam of result.rows) {
                    if( team.id === myTeam.team_id) {
                        dataToSend.push(team);
                    }
                }
            }
            // console.log(dataToSend);
            res.send(dataToSend);
        }).catch((poolError) => {
            console.log(`Query error for "sm_my_teams": ${poolError}`);
            res.sendStatus(500);
        });
    }).catch((newError) => {
        console.log(`New error with stats: ${newError}`);
        res.sendStatus(500);
    });

}); // end of GET route for stats

checkMyTeams = () => {

}

async function getApiStats(urlIn, teamidIn) {

    let response = await axios.get(urlIn);
    return response.data;

}

router.delete('/', (req, res) => {
    console.log(`In delete: ${req.query.id}`);
    const queryText = `DELETE FROM "sm_my_teams"
                       WHERE "person_id" = $1
                       AND "team_id" = $2;`;
    pool.query(queryText, [req.user.id, req.query.id]).then(() => {
        res.sendStatus(200);
    }).catch((poolError) => {
        console.log(`Error completing DELETE ${poolError}`);
        res.sendStatus(500);
    });
});

module.exports = router;