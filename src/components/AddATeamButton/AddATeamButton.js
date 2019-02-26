import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

class NativeLogOutButton extends Component {

    logoutButtonPress = () => {
        this.props.dispatch({ type: 'LOGOUT' });
        this.props.navigation.navigate('Auth');
    }
        // function to add a team to the users list of teams
        addATeam = () => {
            this.props.dispatch({type: 'FETCH_LEAGUES'});
            this.props.navigation.navigate('League');
        } // end addATeam

    render() {
        return(
            <Button
                onPress={this.addATeam}
                title="Add team"
            />
        )
    }
}

export default connect()(NativeLogOutButton);