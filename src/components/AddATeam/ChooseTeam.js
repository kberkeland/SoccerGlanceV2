import React, { Component } from 'react';
import { StyleSheet, FlatList, ScrollView, Alert } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { connect } from 'react-redux';
import NativeLogoutButton from './../LogOutButton/NativeLogoutButton.js';

class ChooseTeam extends Component {

    // This function will add a team to the users list of teams
    addMyTeam = (teamId, teamName) => {
        let dataToServer = { name: teamName,
                             team_id: teamId,
                             person_id: this.props.user.id};
        const action = {type: 'ADD_USER_TEAM', payload: dataToServer};
        this.props.dispatch(action);
        this.props.dispatch({type: 'FETCH_SM_MY_TEAMS', payload: this.props.user.id});
        // this.props.navigation.navigate('Home');
        Alert.alert(`${action.payload.name}`, 'Was added to your teams');
        this.props.navigation.navigate('Home');
    } // end deleteMyteam

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Select a Team',
            headerRight: <NativeLogoutButton navigation={navigation} />
        }
    };

    render() {
        return(
            <ScrollView>
                <FlatList
                    data={this.props.teams}
                    renderItem={({ item, i }) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            onPress={this.onCheckBox}
                            rightElement={
                                <Button
                                    title='Add'
                                    onPress={() => this.addMyTeam(item.id, item.name)}
                                />
                            }
                        />
                    )}
                />
            </ScrollView>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    teams: reduxStore.teams,
    user: reduxStore.user,
});

export default connect(mapStoreToProps)(ChooseTeam);

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