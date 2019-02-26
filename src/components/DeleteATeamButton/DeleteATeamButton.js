import React, { Component } from 'react';
import { Button, Alert } from 'react-native';
import { connect } from 'react-redux';

class NativeLogOutButton extends Component {

    logoutButtonPress = () => {
        this.props.dispatch({ type: 'LOGOUT' });
        this.props.navigation.navigate('Auth');
    }
        // // function to add a team to the users list of teams
        // addATeam = () => {
        //     this.props.dispatch({type: 'FETCH_LEAGUES'});
        //     this.props.navigation.navigate('League');
        // } // end addATeam
    deleteMyteamOnPress = () => {
        const action = {type: 'DELETE_MY_TEAM', payload: teamStats.id};
        this.props.dispatch(action);
        this.props.dispatch({type: 'FETCH_SM_MY_TEAMS', payload: this.props.user.id});
        // this.props.navigation.navigate('Home');
        Alert.alert(`${action.payload.name}`, 'Was added to your teams');
        this.props.navigation.pop();
        } // end deleteMyteam
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