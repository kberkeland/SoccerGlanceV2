const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// constant variables for use in API url setup
const BASE_URL = 'https://api.sportradar.us/soccer-xt3/eu/en/';
const API_KEY = process.env.API_KEY;


router.get('/:teamid', (req, res) => {
    // select statement for finding user team data
    console.log(`in stats route: ${req.params.teamid}`);
    let queryText = `SELECT *
                     FROM "stats"
                     WHERE "team_id" = $1;`;

    pool.query(queryText,[req.params.teamid]).then((result) => {
        console.log(result.rows);
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
        console.log(`Error in stats pool query: ${poolError}`);
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

module.exports = router;