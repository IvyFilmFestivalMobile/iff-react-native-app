import * as React from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FATabBarIcon = name => ({ tintColor }) => (
    <FontAwesome
        style={{ backgroundColor: 'transparent' }}
        name={name}
        color={tintColor}
        size={24}
    />
);

export default FATabBarIcon;