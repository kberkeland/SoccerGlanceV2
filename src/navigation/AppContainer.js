import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import MainPage from '../components/MainPage/MainPage.js';
import DetailPage from '../components/DetailPage/DetailPage.js';
import NativeLoginPage from '../components/NativeLoginPage/NativeLoginPage.js';

// // Navigators
// import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';

// const Stack = StackNavigator({
//     Home: { screen: MainPage },
//     Detail: { screen: DetailPage },
// }, {
//     initialRouteName: 'Home',
// });

// const Tabs = TabNavigator({
//     TabA: { screen: LoginPage },
//     TabB: { screen: LoginPage },
//     TabC: { screen: LoginPage },
// }, {
//     order: ['TabA', 'TabB', 'TabC']
// });

// const Drawer = DrawerNavigator({
//     Stack: { screen: Stack },
//     Tabs: { screen: Tabs },
// })

const AppStack = createStackNavigator({ Home: MainPage, Detail: DetailPage });
const AuthStack = createStackNavigator({ SignIn: NativeLoginPage });

const RootStack = createAppContainer(createSwitchNavigator({
    App: AppStack,
    Auth: AuthStack,
  },{
    initialRouteName: 'Auth',
}));

// const RootStack = createAppContainer(createStackNavigator(
//     {
//         Home: MainPage,
//         Detail: DetailPage,
//     },
//     {
//         initialRouteName: 'Home',
//     }
// ));

// const MyDrawerNavigator = createAppContainer(createDrawerNavigator({
//     Home: {
//       screen: Stack,
//     },
//     Notifications: {
//       screen: DetailPage,
//     },
//   }));

class AppContainer extends Component {
    render() {
        return <RootStack />
    }
}

export default AppContainer;


// // Navigators
// import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation'

// // StackNavigator screens
// import ItemList from './ItemList'
// import Item from './Item'

// // TabNavigator screens
// import TabA from './TabA'
// import TabB from './TabB'
// import TabC from './TabC'

// // Plain old component
// import Plain from './Plain'

// export const Stack = StackNavigator({
//   ItemList: { screen: ItemList },
//   Item: { screen: Item },
// }, {
//   initialRouteName: 'ItemList',
// })

// export const Tabs = TabNavigator({
//   TabA: { screen: TabA },
//   TabB: { screen: TabB },
//   TabC: { screen: Stack },
// }, {
//   order: ['TabA', 'TabB', 'TabC']
// })

// export const Drawer = DrawerNavigator({
//   Stack: { screen: Stack },
//   Tabs: { screen: Tabs },
//     Plain: { screen: Plain },
// })