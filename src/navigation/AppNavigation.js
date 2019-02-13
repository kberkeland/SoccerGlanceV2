import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainPage from '../components/MainPage/MainPage';
import DetailPage from '../components/DetailPage/DetailPage';

export default createAppContainer(createSwitchNavigator(
    {
        Home: MainPage,
        Detail: DetailPage,
    },
    {
        initialRouteName: 'Home',
    }
));