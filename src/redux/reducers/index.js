import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import leagues from './leaguesReducer.js';
import teams from './teamsReducer.js';
import detail from './detailReducer.js';
import myteams from './myteamsReducer.js';
import stats from './statsReducer.js';
import smMyTeams from './smMyTeamsReducer.js';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  leagues, // display available leagues for a user to select
  teams, // display of avaliable teams
  detail, // details of a selected team
  myteams, // list of myteams
  stats, // list of stats for a specific team
  smMyTeams,
});

export default rootReducer;
