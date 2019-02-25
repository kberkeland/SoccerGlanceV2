const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const leaguesRouter = require('./routes/leagues.router');
const teamsRouter = require('./routes/teams.router');
const myteamsRouter = require('./routes/myteams.router');
const statsRouter = require('./routes/statsapi.router');
const sportsmonkeyRouter = require('./routes/sportsmonkey.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/leagues', leaguesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/myteams', myteamsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/sportsmonkey', sportsmonkeyRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
