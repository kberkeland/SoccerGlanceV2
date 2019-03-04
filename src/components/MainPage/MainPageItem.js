import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { Card, Tile }from 'react-native-elements';
import { connect } from 'react-redux';

class MainPageItem extends Component {

    // sends the user to the detail page
    goToDetail = () => {
        this.props.navigation.navigate('Detail', { teamId: this.props.teams.id});
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.goToDetail}>
                    <Card
                        title={this.props.teams.name}
                        image={{uri: this.props.teams.logo_path}}>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(MainPageItem);