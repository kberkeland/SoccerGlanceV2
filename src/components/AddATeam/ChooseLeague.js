import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';
import NativeLogoutButton from './../LogOutButton/NativeLogoutButton.js';

class ChooseLeague extends Component {

    goToChooseTeam = () => {
        this.props.dispatch({type: 'FETCH_TEAMS'});
        this.props.navigation.navigate('Team');
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'League select',
            headerRight: <NativeLogoutButton navigation={navigation} />
        }
    };

    render() {
        return(
            <View>
                <FlatList
                    data={this.props.leagues}
                    renderItem={({ item, i }) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            onPress={this.goToChooseTeam}
                        />
                    )}
                />
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    leagues: reduxStore.leagues,
});

export default connect(mapStoreToProps)(ChooseLeague);

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