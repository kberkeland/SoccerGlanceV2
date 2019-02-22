import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';

class MainPageItem extends Component {

    goToDetail = () => {
        console.log(`in goToDetail: ${this.props.teams.competitor_id}`);
        const action = {type: 'FETCH_STATS', payload: this.props.teams.team_id};
        this.props.dispatch(action);
        this.props.navigation.navigate('Detail', { teamName: this.props.teams.name,
                                                   newRecord: '1-1-1', 
                                                   myteamId: this.props.teams.id});
    }

    render() {
        let record = `${this.props.teams.matches_won}-${this.props.teams.matches_drawn}-${this.props.teams.matches_lost}`;
        return (
            <View>
                <TouchableOpacity
                    style={styles.card}
                    onPress={this.goToDetail}>
                    <Text>{this.props.teams.name}</Text>
                    <Text>Last game: {this.props.teams.last_game}</Text>
                    <Text>Next game: {moment(this.props.teams.next_game).format("dddd, MMMM Do YYYY")}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(MainPageItem);

const styles = StyleSheet.create({
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        justifyContent: 'center',
        width: 150 ,
        height: 150,
        margin: 5
    },
});