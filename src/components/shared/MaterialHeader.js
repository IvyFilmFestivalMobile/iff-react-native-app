import * as React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {HeaderButton, HeaderButtons} from 'react-navigation-header-buttons';

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => (
    <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23}/>
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