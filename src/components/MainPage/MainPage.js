import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MainPageItem from './MainPageItem.js';

class MainPage extends Component {

    componentDidMount() {
        // use component did mount to dispatch an action to request all of my teams
        this.props.dispatch({type: 'FETCH_MY_TEAMS', payload: this.props.reduxStore.user.id});
    }

    // function to add a team to the users list of teams
    addATeam = () => {

    } // end addATeam

    static navigationOptions = { title: 'Home' };

    render() {
        return (
            <View style={styles.container}>
                {this.props.reduxStore.myteams.map((teams, i) => (
                    <MainPageItem key={i} teams={teams} navigation={this.props.navigation} />
                ))}
                <TouchableOpacity
                    style={styles.card}
                    onPress={this.addATeam}>
                    <Text>Add another team</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(MainPage);

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
        justifyContent: 'center',
        width: 100,
        height: 100,
        margin: 5
    },
});