import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* statsSaga() {
    yield takeLatest('FETCH_STATS', getStats);
}

// saga that will call to the API and get stats for a specific team
function* getStats(action) {
    // let test = action.payload;
    try {
        // call to the database for a teams stats
        console.log(`in getStats:${action.payload}`);
        const response = yield axios.get(`https://ae0475c8.ngrok.io/api/stats/${action.payload}`);
        const nextAction = {type: 'SET_STATS', payload: response.data};
        yield put(nextAction);
    } catch (error) {
        // error message when trying to get team list
        console.log(`Axios GET request in "FETCH_STATS" failed: ${error}`);
    }
} // end getStats


export default statsSaga;