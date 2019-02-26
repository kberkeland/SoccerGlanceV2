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

// server route to GET data from the API for specific user teams
router.get('/:personId', rejectUnauthenticated, (req, res) => {
    // create the API url
    let teamUrl = `${TEAMS_URL}${SEASONS_ID}?api_token=${API_KEY}&include=stats`;

    // call async function for axios request then process the results
    getApiStats(teamUrl, req.params.teamid).then((newResult) => {
        // query the database for user teams
        let queryText = `SELECT *
                         FROM "sm_my_teams"
                         WHERE "sm_my_teams"."person_id" = $1
                         ORDER BY "sm_my_teams"."name";`;
        pool.query(queryText, [req.params.personId]).then((result) => {
            // create an empty array for the data to be sent to the client
            let dataToSend = [];

            // loop through the list of API teams
            for(let team of newResult.data) {
                // loop through the user teams
                for(let myTeam of result.rows) {
                    // if the user team and API team match, add it to the dataToSend
                    if( team.id === myTeam.team_id) {
                        dataToSend.push(team);
                    }
                }
            }
            // send data back to the server
            res.send(dataToSend);
        }).catch((poolError) => {
            // console log and status code for an error with selecting user teams
            console.log(`Query error for "sm_my_teams": ${poolError}`);
            res.sendStatus(500);
        });
    }).catch((newError) => {
        // console log and status code for an error when querying the API
        console.log(`New error with stats: ${newError}`);
        res.sendStatus(500);
    });

}); // end of GET route for stats

// function that uses an url and gets stats from the API
async function getApiStats(urlIn, teamidIn) {
    let response = await axios.get(urlIn);
    return response.data;
}

// route for deleting an user team
router.delete('/', (req, res) => {
    // query text for deleting an user team
    const queryText = `DELETE FROM "sm_my_teams"
                       WHERE "person_id" = $1
                       AND "team_id" = $2;`;
    pool.query(queryText, [req.user.id, req.query.id]).then(() => {
        res.sendStatus(200);
    }).catch((poolError) => {
        // console log and status code for an error when deleting an user teams
        console.log(`Error completing DELETE ${poolError}`);
        res.sendStatus(500);
    });
}); //  end DELETE route

module.exports = router;