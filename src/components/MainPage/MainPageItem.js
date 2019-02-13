import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class MainPageItem extends Component {
    render() {
        return (
            <View style={styles.card}>
                <Text>{this.props.teams.name}</Text>
                <Text>{this.props.teams.last}</Text>
                <Button
                    title="Details" 
                    onPress={() => {( this.props.navigation.navigate('Details') )}}
                />
            </View>
        )
    }
}

export default MainPageItem

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