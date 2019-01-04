import React from 'react';
import {ScrollView} from 'react-native';

class Settings extends React.PureComponent {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'Settings',
    });

    render() {
        return (
            <ScrollView>

            </ScrollView>
        );
    }
}

export default Settings;