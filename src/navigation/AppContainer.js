import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import MainPage from '../components/MainPage/MainPage.js';
import DetailPage from '../components/DetailPage/DetailPage.js';
import NativeLoginPage from '../components/NativeLoginPage/NativeLoginPage.js';
import ChooseLeague from '../components/AddATeam/ChooseLeague.js';
import ChooseTeam from '../components/AddATeam/ChooseTeam.js';

const AppStack = createStackNavigator({ Home: MainPage, Detail: DetailPage, League: ChooseLeague, Team: ChooseTeam });
const AuthStack = createStackNavigator({ SignIn: NativeLoginPage });
// const AddTeamStack = createStackNavigator({ League: ChooseLeague, Team: ChooseTeam });

const RootStack = createAppContainer(createSwitchNavigator({
    App: AppStack,
    Auth: AuthStack,
  },{
    initialRouteName: 'Auth',
}));

class AppContainer extends Component {
    render() {
        return <RootStack />
    }
}

export default AppContainer;