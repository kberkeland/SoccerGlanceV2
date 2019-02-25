import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
// import { withNavigation } from 'react-navigation';
import { Card }from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
// import { FlatList } from 'react-native-gesture-handler';

class MainPageItem extends Component {

    goToDetail = () => {
        // const action = {type: 'FETCH_STATS', payload: this.props.teams.competitor_id};
        // this.props.dispatch(action);
        this.props.navigation.navigate('Detail', { teamId: this.props.teams.id});
        // setTimeout(() => {
        //     this.props.navigation.navigate('Detail', { teamId: this.props.teams.id,
        //                                                newRecord: '1-1-1', 
        //                                                myteamId: this.props.teams.id});
        // }, 1000);
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.goToDetail}>
                    <Card
                        title={this.props.teams.name}
                        image={{uri: this.props.teams.logo_path}}>
                        <Text style={{marginBottom: 10}}>
                            The idea with React Native Elements is more about component structure than actual design.
                        </Text>
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