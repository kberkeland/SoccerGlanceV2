import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* myteamsSaga() {
    yield takeLatest('FETCH_MY_TEAMS', findMyteams);
    yield takeLatest('DELETE_MY_TEAM', deleteMyteam)
}

// worker Saga: will be fired on "FETCH_TEAMS" actions
function* findMyteams() {
    try {
        // call to the database for team data
        const response = yield axios.get('https://ae0475c8.ngrok.io/api/myteams');
        const action = {type: 'SET_MY_TEAMS', payload: response.data};
        yield put(action);
    } catch (error) {
        // error message when trying to get team list
        console.log(`Get request failed for myteams: ${error}`);
    }
}

// function for DELETE when user chooses to remove a team
function* deleteMyteam(action) {
    try {
        yield axios.delete(`https://ae0475c8.ngrok.io/api/myteams?id=${action.payload}`);
        const nextAction = {type: 'SET_MY_TEAMS'};
        yield put(nextAction);
    } catch (error) {
        console.log(`Error in deleteMyteam: ${error}`);
    }
  } // end deleteMyteam

export default myteamsSaga;