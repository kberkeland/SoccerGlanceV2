import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* myteamsSaga() {
    yield takeLatest('FETCH_MY_TEAMS', findMyteams);
}

// worker Saga: will be fired on "FETCH_TEAMS" actions
function* findMyteams() {
    try {
        // call to the database for team data
        const response = yield axios.get('/myteams');
        const action = {type: 'SET_MY_TEAMS', payload: response.data};
        yield put(action);
    } catch (error) {
        // error message when trying to get team list
        console.log(`Get request failed for myteams: ${error}`);
    }
}


export default myteamsSaga;