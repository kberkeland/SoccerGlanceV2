import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainPage from '../components/MainPage/MainPage';
import DetailPage from '../components/DetailPage/DetailPage';

export default createAppContainer(createStackNavigator(
    {
        Home: MainPage,
        Detail: DetailPage,
    },
    {
        initialRouteName: 'Home',
    }
));