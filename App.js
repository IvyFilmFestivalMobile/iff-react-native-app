import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Home from './src/components/Home';
import Schedule from './src/components/schedule/Schedule';
import EventDetails from './src/components/schedule/EventDetails';
import Films from './src/components/Films';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FATabBarIcon from "./src/components/shared/FATabBarIcon";

const ScheduleNavigator = createStackNavigator(
    {
        Schedule: {
            screen: Schedule,
        },
        EventDetails: {
            screen: EventDetails,
        }
    }, {
        initialRouteName: 'Schedule',
        navigationOptions: {
            tabBarIcon: FATabBarIcon('calendar'),
        }
    }
);

const AppNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: Home,
        },
        Schedule: ScheduleNavigator,
        Films: {
            screen: Films
        }
    }, {
      initialRouteName: 'Home',
      activeColor: '#f0edf6',
      barStyle: { backgroundColor: '#ee5956' }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
    );
  }
}