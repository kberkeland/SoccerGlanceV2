// Navigators
import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import MainPage from './../components/MainPage/MainPage.js';
import DetailPage from './../components/DetailPage/DetailPage.js';

export const Stack = StackNavigator({
    Home: { screen: MainPage },
    Detail: { screen: DetailPage },
}, {
    initialRouteName: 'Home',
});