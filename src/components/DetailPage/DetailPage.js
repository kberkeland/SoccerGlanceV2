import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import NativeLogoutButton from './../LogOutButton/NativeLogoutButton.js';

class DetailPage extends Component {

    // componentDidMount() {
    //     const action = {type: 'FETCH_STATS'};
    //     this.props.dispatch(action);
    // }

    deleteMyteamOnPress = () => {
        const action = {type: 'DELETE_MY_TEAM', payload: this.props.stats.team_id};
        this.props.dispatch(action);
        this.props.dispatch({type: 'FETCH_MY_TEAMS', payload: this.props.user.id});
        // this.props.navigation.navigate('Home');
        this.props.navigation.pop();
    } // end deleteMyteam

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Details',
            headerRight: <NativeLogoutButton navigation={navigation} />
        }
    };

    render() {
        const { navigation } = this.props;
        const teamName = navigation.getParam('teamName', 'Some team');
        // const record = this.props.reduxStore.stats.map(teamOut => 
        //     `${teamOut.matches_won}-${teamOut.matches_drawn}-${teamOut.matches_lost}`);
        const record = `${this.props.stats.matches_won}-${this.props.stats.matches_drawn}-${this.props.stats.matches_lost}`;
        const myteamId = navigation.getParam('myteamId', 'no myteamId');

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>{teamName}</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{teamName}</Text>
                        <Text style={styles.cardText}>{record}</Text>
                    </View>
                    <Button
                        title='Remove from my teams'
                        onPress={this.deleteMyteamOnPress}
                    />
                    <Text>Matches played: {this.props.stats.matches_played}</Text>
                    <Text>Matches won: {this.props.stats.matches_won}</Text>
                    <Text>Matches drawn: {this.props.stats.matches_drawn}</Text>
                    <Text>Matches lost: {this.props.stats.matches_lost}</Text>
                    <Text>Goals scored: {this.props.stats.goals_scored}</Text>
                    <Text>Goals conceded: {this.props.stats.goals_conceded}</Text>
                    <Text>League position: {this.props.stats.group_position}</Text>
                {/* {this.props.reduxStore.stats.map((stats, i) => (
                    <Text key={i}>{stats.id}</Text>
                ))} */}
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    stats: reduxStore.stats,
    user: reduxStore.user
});

export default connect(mapStoreToProps)(DetailPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    heading: {
        textAlign: 'center',
        fontSize: 20
    },
    cardText: {
        textAlign: 'center',
    },
});