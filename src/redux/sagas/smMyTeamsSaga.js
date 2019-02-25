import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import Ngrok from './../../components/Ngrok.js';

function* smMyTeamsSaga() {
    yield takeLatest('FETCH_SM_MY_TEAMS', findSmMyTeams);
    yield takeLatest('DELETE_SM_MY_TEAM', deleteSmMyTeam)
}

// worker Saga: will be fired on "FETCH_TEAMS" actions
function* findSmMyTeams(action) {
    console.log('Action', action);
    try {
        // call to the database for team data
        const response = yield axios.get(`${Ngrok.NGROK}/api/sportsmonkey/${action.payload}`);
        const nextAction = {type: 'SET_SM_MY_TEAMS', payload: response.data};
        yield put(nextAction);
    } catch (error) {
        // error message when trying to get team list
        console.log(`Get request failed for myteams: ${error}`);
    }
}

// function for DELETE when user chooses to remove a team
function* deleteSmMyTeam(action) {
    try {
        yield axios.delete(`${Ngrok.NGROK}/api/sportsmonkey?id=${action.payload}`);
        const nextAction = {type: 'SET_SM_MY_TEAMS'};
        yield put(nextAction);
    } catch (error) {
        console.log(`Error in deleteMyteam: ${error}`);
    }
  } // end deleteMyteam

export default smMyTeamsSaga;