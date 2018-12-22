import React from 'react';
import { Text, View } from 'react-native';


const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style= {viewStyle}>
            <Text style = {textStyle}>{props.header}</Text> 
        </View>
    )
}

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 2,
        position: 'relative',
    },
    textStyle: {
        fontSize: 18,
    }
}

export default Header;