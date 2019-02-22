const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// constant variables for use in API url setup
const BASE_URL = 'https://api.sportradar.us/soccer-xt3/eu/en/';
const API_KEY = process.env.API_KEY;

router.get('/:teamid', async (req, res) => {
    let teamUrl = `${BASE_URL}teams/${req.params.teamid}/profile.json?api_key=${API_KEY}`;
    let dataToSend = await axios.get(teamUrl).then((response) => {
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
        
        // create object for the current team
        return {
                name: response.data.team.name,
                color: jerseyColor,
                teamStats: currentSeasonStats
        };
    }).catch((error) => {
        console.log(`Error with axios ${teamUrl} attempt: ${error}`);
    });

    res.send(dataToSend);

}); // end of GET route for stats

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