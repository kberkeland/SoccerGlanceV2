import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* teamsSaga() {
    yield takeLatest('FETCH_TEAMS', findTeams);
    yield takeLatest('ADD_USER_TEAM', addUserTeam);
}

// will add the selected team to the users list of teams followed
function* addUserTeam(action) {
    try {
        // call to the database for team data
        yield axios.post('api/teams', action.payload);
    } catch (error) {
        // error message when trying to add a team
        console.log(`Add team request failed: ${error}`);
    }
}

// worker Saga: will be fired on "FETCH_TEAMS" actions
function* findTeams() {
    try {
        // call to the database for team data
        const response = yield axios.get('http://c4aad331.ngrok.io/api/teams');
        console.log(response);
        const action = {type: 'SET_TEAMS', payload: response.data};
        yield put(action);
    } catch (error) {
        // error message when trying to get team list
        console.log(`Get request failed for teams: ${error}`);
    }
}

export default teamsSaga;