import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from "react-navigation";
import Festival from './Festival';
import About from './About';
import Settings from './Settings';

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff',
    spinner_color: '#0e3737',
    indicator_color: '#eff472'

};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.header_background_color,
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    content: {
        padding: 4,
    },
    scrollContainer: {
        flexGrow: 1
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

const InfoTabs = createMaterialTopTabNavigator({
    Festival: {
        screen: Festival
    },
    About: {
        screen: About
    },
    Settings: {
        screen: Settings
    },
}, {
    tabBarOptions: {
        style: {
            backgroundColor: colors.header_background_color,
        },
        activeTintColor: colors.indicator_color,
        indicatorStyle: {
            backgroundColor: colors.indicator_color
        },
    },
});

class Info extends React.Component {
    static router = InfoTabs.router;
    static navigationOptions = ({navigation}) => {
        return ({
            headerTitle: 'Info',
            headerStyle: styles.header,
            headerTintColor: colors.header_color,
        });
    };

    render() {
        return (
            <InfoTabs navigation={this.props.navigation}/>
        );
    }
}

export default Info;