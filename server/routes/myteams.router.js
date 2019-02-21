const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// constant variables for use in API url setup
const BASE_URL = 'https://api.sportradar.us/soccer-xt3/eu/en/';
const API_KEY = process.env.API_KEY;

router.get('/teams/:id', (req, res) => {
    // select statement for finding user team data
    let queryText = `SELECT "my_teams"."name", "my_teams"."competitor_id", "leagues"."tournament_id",
                            "stats"."matches_won", "stats"."matches_drawn", "stats"."matches_lost",
                            "my_teams"."id", "teams"."id" AS "team_id"
                     FROM "my_teams"
                     JOIN "leagues" ON "leagues"."id" = "my_teams"."league_id"
                     JOIN "teams" ON "teams"."competitor_id" = "my_teams"."competitor_id"
                     JOIN "stats" ON "stats"."team_id" = "teams"."id"
                     WHERE "my_teams"."person_id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(result.rows);
    // pool.query(queryText, [req.user.id]).then( async (result) => {

    //     let responseToClient = [];

    //     for(team of result.rows) {

    //         let teamUrl = `${BASE_URL}teams/${team.competitor_id}/profile.json?api_key=${API_KEY}`;
    //         // let dataToSend = await axios.get(teamUrl).then((response) => {
    //         //     // loop through jersey data and season statistics and create a team object to send to app
    //         //     // local variables
    //         //     let currentSeasonStats = '';
    //         //     let jerseyColor = '';
        
    //         //     // for loop to get jersey color
    //         //     // console.log(response.data.jerseys);
    //         //     for(let jersey of response.data.jerseys) {
    //         //         if(jersey.type === 'home') { 
    //         //             jerseyColor = jersey.base;
    //         //         } // end if
    //         //     } // end for of
        
    //         //     // loop through all seasons and find statistics for current season
    //         //     for(let season of response.data.statistics.seasons) {
    //         //         if(season.id === 'sr:season:54571') {
    //         //             currentSeasonStats = season.statistics;
    //         //         } // end if
    //         //     } // end for of
        
    //         //     // create object for the current team
    //         //     return {
    //         //         name: response.data.team.name,
    //         //         color: jerseyColor,
    //         //         teamStats: currentSeasonStats
    //         //     };
    //         // }).catch((error) => {
    //         //     console.log(`Error with axios ${teamUrl} attempt: ${error}`);
    //         // });

    //         let dataToSend = await waitToSendUrl(teamUrl);
    //         // console.log(dataToSend.name);
    //         responseToClient.push(dataToSend);

    //     }; // end for of loop on result.rows

    //     // res.send(responseToClient);
    //     console.log('Hi');

    }).catch((poolError) => {
        // console log and client message for error
        console.log(`Error in pool query for myteams: ${poolError}`);
        res.sendStatus(500);
    });
}); // end of GET route for myteams

function waitToSendUrl(urlTwo) {
return new Promise(resolve => {
    setTimeout(() => {
        resolve(getTeamStats(urlTwo));
    }, 1000);
    });
}

function getTeamStats(urlIn) {

    axios.get(urlIn).then((response) => {
        // loop through jersey data and season statistics and create a team object to send to app
        // local variables
        let currentSeasonStats = '';
        let jerseyColor = '';
    
        // for loop to get jersey color
        // console.log(response.data.jerseys);
        for(let jersey of response.data.jerseys) {
            if(jersey.type === 'home') { 
                jerseyColor = jersey.base;
            } // end if
        } // end for of
    
        // loop through all seasons and find statistics for current season
        for(let season of response.data.statistics.seasons) {
            if(season.id === 'sr:season:54571') {
                currentSeasonStats = season.statistics;
            } // end if
        } // end for of

        console.log(`in getTeamStats: ${response.data.team.name}`);
    
        // create object for the current team
        return {
            name: response.data.team.name,
            color: jerseyColor,
            teamStats: currentSeasonStats
        };
    
    }).catch((error) => {
        console.log(`Axios GET error ${urlIn} attempt: ${error}`);
    });

}

router.delete('/', (req, res) => {
    const queryText = `DELETE FROM "my_teams"
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