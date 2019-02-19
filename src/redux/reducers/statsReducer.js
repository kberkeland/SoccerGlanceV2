const statsReducer = (state = [], action) => {
    if( action.type === 'SET_STATS' ) {
        return action.payload;
    } // end if
        return state;
};
  
export default statsReducer;