import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MainPageItem from './MainPageItem.js';
import NativeLogoutButton from './../LogOutButton/NativeLogoutButton.js';
import AddATeamButton from './../AddATeamButton/AddATeamButton.js';

var {windowHeight, windowWidth} = Dimensions.get('window');

class MainPage extends Component {

    componentDidMount() {
        // use component did mount to dispatch an action to request all of my teams
        this.props.dispatch({type: 'FETCH_SM_MY_TEAMS', payload: this.props.reduxStore.user.id});
    }

    // function to add a team to the users list of teams
    addATeam = () => {
        this.props.dispatch({type: 'FETCH_LEAGUES'});
        this.props.navigation.navigate('League');
    } // end addATeam
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <NativeLogoutButton navigation={navigation} />,
            headerTitle: 'Home',
            headerRight: <AddATeamButton navigation={navigation} />,
        }
    };

    render() {
        return (
            <View style={styles.container} contentContainerStyle={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={true}>
                    {this.props.reduxStore.smMyTeams.map((teams, i) => (
                        <MainPageItem key={i} teams={teams} navigation={this.props.navigation} />
                    ))}
                </ScrollView>
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
        height: windowHeight,
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

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         borderWidth: 1,
//         backgroundColor: '#F5FCFF',
//         margin: 10
//     },
//     card: {
//         borderWidth: 3,
//         borderRadius: 3,
//         borderColor: '#000',
//         justifyContent: 'center',
//         width: 150,
//         height: 150,
//         margin: 5
//     },
// });