import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import Info from './src/components/info/Info';
import Schedule from './src/components/schedule/Schedule';
import EventDetails from './src/components/schedule/EventDetails';
import Films from './src/components/films/Films';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FATabBarIcon from "./src/components/shared/FATabBarIcon";
import MaterialTabBarIcon from "./src/components/shared/MaterialTabBarIcon";
import {persistor, store} from "./src/redux/store";
import SplashScreen from 'react-native-splash-screen';

const InfoNavigator = createStackNavigator(
    {
        Info: {
            screen: Info
        }
    }, {
        initialRouteName: 'Info',
    }
);

InfoNavigator.navigationOptions = {
    tabBarIcon: MaterialTabBarIcon('info-outline'),
};

const ScheduleNavigator = createStackNavigator(
    {
        Schedule: {
            screen: Schedule,
        },
        EventDetails: {
            screen: EventDetails,
        }
    },
);

ScheduleNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarIcon: FATabBarIcon('calendar'),
        tabBarVisible,
    };
};

const FilmsNavigator = createStackNavigator(
    {
        Films: {
            screen: Films,
        },
        // EventDetails: {
        //     screen: EventDetails,
        // }
    }, {
        initialRouteName: 'Films',
    }
);

FilmsNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarIcon: MaterialTabBarIcon('movie'),
        tabBarVisible,
    };
};


const AppNavigator = createMaterialBottomTabNavigator(
    {
        Info: InfoNavigator,
        Schedule: ScheduleNavigator,
        Films: FilmsNavigator,
    }, {
        initialRouteName: 'Schedule',
      activeColor: '#f0edf6',
      barStyle: { backgroundColor: '#ee5956' }
    });

const AppContainer = createAppContainer(AppNavigator);

//TODO: Return AppLoading if PersistGate incomplete
export default class App extends React.Component {

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <StoreProvider store={store}>
                <PersistGate persistor={persistor}>
                    <PaperProvider>
                        <AppContainer/>
                    </PaperProvider>
                </PersistGate>
            </StoreProvider>
        );
    }
}