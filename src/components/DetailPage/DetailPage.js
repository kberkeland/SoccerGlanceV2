import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

class DetailPage extends Component {

    // componentDidMount() {
    //     const action = {type: 'FETCH_STATS'};
    //     this.props.dispatch(action);
    // }

    deleteMyteamOnPress = () => {
        const action = {type: 'DELETE_MY_TEAM', payload: this.props.stats.id};
        this.props.dispatch(action);
    } // end deleteMyteam

    static navigationOptions = { title: 'Details' };

    render() {
        const { navigation } = this.props;
        const teamName = navigation.getParam('teamName', 'Some team');
        const record = navigation.getParam('newRecord', 'some default value');
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
                {this.props.reduxStore.stats.map((stats, i) => (
                    <Text key={i}>{stats.id}</Text>
                ))}
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
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