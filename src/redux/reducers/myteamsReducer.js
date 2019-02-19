const initMyteams = [{ name: 'Chelsea FC', matches_won: '15', matches_drawn: '5', matches_lost: '6', team_id: '6'}, 
                     { name: 'Arsenal FC', matches_won: '15', matches_drawn: '5', matches_lost: '6', team_id: '7'}];
const myteamsReducer = (state = initMyteams, action) => {
    if( action.type === 'SET_MY_TEAMS' ) {
        return action.payload;
    } // end if
        return state;
};
  
export default myteamsReducer;