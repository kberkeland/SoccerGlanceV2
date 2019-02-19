import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class MainPageItem extends Component {

    goToDetail = () => {
        console.log(`in goToDetail: ${this.props.teams.id}`);
        const action = {type: 'FETCH_STATS', payload: this.props.teams.team_id};
        this.props.dispatch(action);
        this.props.navigation.navigate('Detail', { teamName: this.props.teams.name,
                                                   newRecord: '1-1-1', 
                                                   myteamId: this.props.teams.id});
    }

    render() {
        let record = `${this.props.teams.matches_won}-${this.props.teams.matches_drawn}-${this.props.teams.matches_lost}`;
        return (
            <View style={styles.card}>
                <Text>{this.props.teams.name}</Text>
                <Text>{record}</Text>
                <Button
                    title="Details" 
                    onPress={this.goToDetail}
                />
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
        width: 100,
        height: 100,
        margin: 5
    },
});