const myteamsReducer = (state = [], action) => {
    if( action.type === 'SET_MY_TEAMS' ) {
        return action.payload;
    } // end if
        return state;
};
  
export default myteamsReducer;