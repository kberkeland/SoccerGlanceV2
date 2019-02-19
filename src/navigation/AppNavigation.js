import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginPage from '../components/LoginPage/LoginPage.js';
import MainPage from '../components/MainPage/MainPage.js';
import DetailPage from '../components/DetailPage/DetailPage.js';

export default createAppContainer(createStackNavigator(
    {
        Login: LoginPage,
        Home: MainPage,
        Detail: DetailPage,
    },
    {
        initialRouteName: 'Home',
    }
));