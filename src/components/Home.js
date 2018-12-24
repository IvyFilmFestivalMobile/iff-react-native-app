import React from 'react';
import { View } from 'react-native';
import Header from "./shared/Header";
import FATabBarIcon from "./shared/FATabBarIcon";

class Home extends React.Component {
    static navigationOptions = {
        tabBarIcon: FATabBarIcon('home')
    };

    render() {
        return(
            <View>
                <Header title={"Home"} />
            </View>
        );
    }
}

export default Home;