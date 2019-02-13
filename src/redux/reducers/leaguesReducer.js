const leaguesReducer = (state = [], action) => {
    if( action.type === 'SET_LEAGUES') {
        // let newArray = [];
        // for(let test of action.payload) {
        //     newArray.push(test.teams);
        //     // console.log(`Action payload: ${test.teams.name}`);
        // }
        // let flatArray = newArray.flat();
        // // for(let another of newArray) {
        // //     console.log(`Try again: ${another.id}`);
        // // }
        return action.payload;
    } // end if
        return state;
};
  
export default leaguesReducer;