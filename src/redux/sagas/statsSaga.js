import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* statsSaga() {
    yield takeLatest('FETCH_STATS', getStats);
}

// saga that will call to the API and get stats for a specific team
function* getStats() {
    try {
        // call to the database for team data
        const response = yield axios.get('http://c4aad331.ngrok.io/api/stats');
        const action = {type: 'SET_STATS', payload: response.data};
        yield put(action);
    } catch (error) {
        // error message when trying to get team list
        console.log(`Axios GET request in "FETCH_STATS" failed: ${error}`);
    }
} // end getStats


export default statsSaga;