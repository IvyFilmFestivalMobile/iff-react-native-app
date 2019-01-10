import * as React from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const MaterialTabBarIcon = name => ({ tintColor }) => (
    <MaterialIcons
        style={{ backgroundColor: 'transparent' }}
        name={name}
        color={tintColor}
        size={24}
    />
);

export default MaterialTabBarIcon;