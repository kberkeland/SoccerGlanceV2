import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

class NativeLogOutButton extends Component {

    logoutButtonPress = () => {
        this.props.dispatch({ type: 'LOGOUT' });
        this.props.navigation.navigate('Auth');
    }

    render() {
        return(
            <Button
                onPress={this.logoutButtonPress}
                title="Logout"
            />
        )
    }
}

export default connect()(NativeLogOutButton);