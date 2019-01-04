import React from 'react';
import {ScrollView} from 'react-native';

class About extends React.PureComponent {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'About',
    });

    render() {
        return (
            <ScrollView>

            </ScrollView>
        );
    }
}

export default About;