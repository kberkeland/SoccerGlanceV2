import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* detailSaga() {
    yield takeLatest('FETCH_DETAIL', getDetail);
    yield takeLatest('CHANGE_DETAIL', changeDetail);
}

// allows the user to change the details displayed on the screen
function* changeDetail(action) {
    try {
        // call to the database for team data
        yield axios.put('api/teams', action.payload);
    } catch (error) {
        // error message when trying to add a team
        console.log(`Add team request failed: ${error}`);
    }
} // end changeDetail

// worker Saga: will be fired on "FETCH_DETAIL" actions
function* getDetail() {
    try {
        // call to the database for details about the selected team
        const response = yield axios.get('https://ae0475c8.ngrok.io/api/detail');
        const action = {type: 'SET_DETAIL', payload: response.data};
        yield put(action);
    } catch (error) {
        // error message when trying to get team details
        console.log(`Request to server failed to GET detail: ${error}`);
    }
} // end getDetail

export default detailSaga;