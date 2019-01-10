import * as React from 'react';
import {HeaderButton, HeaderButtons} from 'react-navigation-header-buttons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => (
    <HeaderButton {...props}
                  IconComponent={props.iconSource === 'MaterialCommunityIcons' ?
                      MaterialCommunityIcons : MaterialIcons}
                  iconSize={23}/>
);

export const MaterialHeaderButtons = props => {
    return (
        <HeaderButtons
            HeaderButtonComponent={MaterialHeaderButton}
            OverflowIcon={<MaterialIcons name="more-vert" size={23} color="white"/>}
            {...props}
        />
    );
};
export const Button = HeaderButtons.Item;