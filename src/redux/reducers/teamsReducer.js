const initTeams = [{ name: 'Chelsea', last: 'L 0-6', next: 'Man U'}, { name: 'Man U', last: 'W 2-1', next: 'Chelsea'},
                   { name: 'Fulham', last: 'L 1-2', next: 'Arsenal'},{ name: 'Newcastle', last: 'W 3-1', next: 'Liverpool'}];
const teamsReducer = (state = initTeams, action) => {
    if( action.type === 'SET_TEAMS' ) {
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
  
export default teamsReducer;