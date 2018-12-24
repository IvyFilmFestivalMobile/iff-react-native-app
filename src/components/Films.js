import React from 'react';
import { View } from 'react-native';
import Header from "./shared/Header";
import MaterialTabBarIcon from "./shared/MaterialTabBarIcon";

class Films extends React.Component {
    static navigationOptions = {
        tabBarIcon: MaterialTabBarIcon('movie')
    };

    render() {
        return(
            <View>
                <Header title={"Films"} />
            </View>
        );
    }
}

export default Films;