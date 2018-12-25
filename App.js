import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Home from './src/components/Home';
import Schedule from './src/components/schedule/Schedule';
import Films from './src/components/Films';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from "react-navigation";

const AppNavigator = createMaterialBottomTabNavigator(
    {
      Home: {
        screen: Home,
      },
      Schedule: {
        screen: Schedule
      },
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