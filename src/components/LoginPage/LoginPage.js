import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';


class LoginPage extends Component {

    componentDidMount() {
        // use component did mount to dispatch an action to request all of my teams
        this.props.dispatch({type: 'FETCH_MY_TEAMS'});
    }

    static navigationOptions = { title: 'Home' };

    render() {
        return (
            <View style={styles.container}>
                <Text>This is a login page</Text>
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(LoginPage);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        backgroundColor: '#F5FCFF',
        margin: 10
    },
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        width: 100,
        height: 100,
        margin: 5
    },
});