const initDetail = { name: 'Chelsea', 
                     record: '10-10-10',
                     last_game: 'Man City',
                     last_game_score: '0-6',
                     next_game: 'Malmo',
                     next_game_date: 'Thursday, February 14th'
                   };

const detailReducer = (state = initDetail, action) => {
    if( action.type === 'SET_DETAIL' ) {
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
  
export default detailReducer;