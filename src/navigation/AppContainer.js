import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainPage from '../components/MainPage/MainPage';
import DetailPage from '../components/DetailPage/DetailPage';

const RootStack = createAppContainer(createStackNavigator(
    {
        Home: MainPage,
        Detail: DetailPage,
    },
    {
        initialRouteName: 'Home',
    }
));

class AppContainer extends Component {
    render() {
        return <RootStack />
    }
}

export default AppContainer;