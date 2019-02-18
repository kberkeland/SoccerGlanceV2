const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// constant variables for use in API url setup
const BASE_URL = 'https://api.sportradar.us/soccer-xt3/eu/en/';
const API_KEY = process.env.API_KEY;


router.get('/', rejectUnauthenticated, (req, res) => {
    // select statement for finding user team data
    let queryText = `SELECT "my_teams"."name", "my_teams"."competitor_id", "leagues"."tournament_id"
                     FROM "my_teams"
                     JOIN "leagues" ON "leagues"."id" = "my_teams"."league_id"
                     WHERE "my_teams"."person_id" = $1;`;

    pool.query(queryText, [req.user.id]).then( async (result) => {
        // variable for storing a list of axios requests for every user team
        let axiosArray =[];

        // loop through user teams and create a url for the data
        for(team of result.rows) {
            let urlIn = `${BASE_URL}teams/${team.competitor_id}/profile.json?api_key=${API_KEY}`;
            console.log(`Url: ${urlIn}`);
            axiosArray.push(urlIn);
        };

        // let arrayOut = [];
        // const arrayOut = loopMyTeams(axiosArray);

        let arrayOut = await loopMyTeams(axiosArray);
        res.send(arrayOut);
        // await Promise.all(res.send(arrayOut));

        // await res.send(loopMyTeams(axiosArray));
        console.log('Hi');

    }).catch((poolError) => {
        // console log and client message for error
        console.log(`Error in API get for ${req.user.id} team stats: ${poolError}`);
        res.sendStatus(500);
    });
}); // end of GET route for myteams

function scaryClown(urlToo) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getTeamStats(urlToo));
        }, 2000);
    });
}
  
//   async function msg() {
//     const msg = await scaryClown();
//     console.log('Message:', msg);
//   }
  
//   msg(); // Message: 🤡 <-- after 2 seconds

async function loopMyTeams(inputArray) {
    let anotherTestArray = [];
    for(let url of inputArray) {
        // let testClown = await scaryClown(url);
        let testClown = await getTeamStats(url);
        anotherTestArray.push(testClown);
    }
    // for(let x of anotherTestArray) {
    //     console.log(x);
    // }
    return anotherTestArray;
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

        // create object for the current team
        let dataToSend = {
            name: response.data.team.name,
            color: jerseyColor,
            teamStats: currentSeasonStats
        };

        console.log(dataToSend.name);

        return dataToSend;

    }).catch((error) => {
        console.log(`Error with axios ${urlIn} attempt: ${error}`);
    });

}

module.exports = router;