import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import NativeLogoutButton from './../LogOutButton/NativeLogoutButton.js';

class DetailPage extends Component {

    // componentDidMount() {
    //     const action = {type: 'FETCH_STATS'};
    //     this.props.dispatch(action);
    // }

    deleteMyteamOnPress = (teamIdIn, teamNameIn) => {
        const action = {type: 'DELETE_SM_MY_TEAM', payload: teamIdIn};
        this.props.dispatch(action);
        this.props.dispatch({type: 'FETCH_SM_MY_TEAMS', payload: this.props.user.id});
        // this.props.navigation.navigate('Home');
        Alert.alert(`${teamNameIn}`, 'Was deleted from your teams');
        this.props.navigation.pop();
        // this.props.navigation.navigate('Home');
    } // end deleteMyteam

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Details',
            headerRight: <NativeLogoutButton navigation={navigation}/>
        }
    };

    render() {
        const { navigation } = this.props;
        const teamId = navigation.getParam('teamId', 'Some team');
        const currentTeam = this.props.smMyTeams.find( team => ( team.id === teamId ));
        const teamStats = currentTeam.stats.data.find( stats => ( stats.season_id === currentTeam.current_season_id));
        // console.log(currentTeam.stats.data);
        // console.log(teamStats);

        return (
            <View style={styles.container}>
                {/* <Text>{currentTeam.name}</Text> */}
                {/* <FlatList
                    data={teamStats}
                    renderItem={({ item, i }) => (
                        <Text>{item}</Text>
                    )}
                /> */}
                <Text style={styles.heading}>{currentTeam.name}</Text>
                {/* <Text style={styles.heading}>{currentTrecord}</Text> */}
                    <Text>Wins: {teamStats.win.total}</Text>
                    <Text>Draws: {teamStats.draw.total}</Text>
                    <Text>Lost: {teamStats.lost.total}</Text>
                    <Text>Average goals scored: {teamStats.avg_goals_per_game_scored.total}</Text>
                    <Text>Average goals conceded: {teamStats.avg_goals_per_game_conceded.total}</Text>
                    <Text>Clean sheets: {teamStats.clean_sheet.total}</Text>
                    <Text>Goals scored: {teamStats.goals_for.total}</Text>
                    <Text>Goals conceded: {teamStats.goals_against.total}</Text>
                    <Button title='Remove this team?' onPress={() => this.deleteMyteamOnPress(currentTeam.id, currentTeam.name)} />
                {/* {this.props.reduxStore.stats.teamStats.map((stats, i) => (
                    <Text key={i}>{stats}</Text>
                ))} */}
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    smMyTeams: reduxStore.smMyTeams,
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