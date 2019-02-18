import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class MainPageItem extends Component {

    goToDetail = () => {
        console.log('in goToDetail');
        const action = {type: 'FETCH_TEAMS'};
        this.props.dispatch(action);
        this.props.navigation.navigate('Detail');
    }

    render() {
        return (
            <View style={styles.card}>
                <Text>{this.props.teams.name}</Text>
                <Text>{this.props.teams.color}</Text>
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