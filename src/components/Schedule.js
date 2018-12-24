import React from 'react';
import { View } from 'react-native';
import Header from "./shared/Header";
import FATabBarIcon from "./shared/FATabBarIcon";

class Schedule extends React.Component {
    static navigationOptions = {
        tabBarIcon: FATabBarIcon('calendar')
    };

    render() {
        return(
            <View>
                <Header title={"Schedule"} />
            </View>
        );
    }
}

export default Schedule;