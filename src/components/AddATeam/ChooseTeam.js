import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Switch, ScrollView } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';
import NativeLogoutButton from './../LogOutButton/NativeLogoutButton.js';

class ChooseTeam extends Component {

    state = {
        toggled: false,
    }

    changeSwitchValue = () => {
        this.setState((state) => ({
            toggled: !state.toggled,
        }));
    }

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
                                <Switch
                                    onValueChange={(value) => this.setState({ toggled: value })}
                                    value={this.state.toggled}
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