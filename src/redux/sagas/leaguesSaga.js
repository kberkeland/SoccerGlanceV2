import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import Ngrok from './../../components/Ngrok.js';

function* leaguesSaga() {
    yield takeLatest('FETCH_LEAGUES', findLeagues);
}

// saga will be called when the user needs to select a league to add a team
function* findLeagues() {
    try {
        // call to the database for league data
        const response = yield axios.get(`${Ngrok.NGROK}/api/leagues`);
        const action = {type: 'SET_LEAGUES', payload: response.data};
        yield put(action);
    } catch (error) {
        console.log(`Get request failed for leagues: ${error}`);
    }
}

export default leaguesSaga;