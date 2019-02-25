const smMyTeamsReducer = (state = [], action) => {
    if( action.type === 'SET_SM_MY_TEAMS' ) {
        return action.payload;
    } // end if
        return state;
};
  
export default smMyTeamsReducer;