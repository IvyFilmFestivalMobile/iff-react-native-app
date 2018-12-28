import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff'
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.header_background_color, //TODO: make universal don't copy

    },
});

class EventDetails extends React.Component {
    static navigationOptions = {
        title: 'Event Details',
        tabBarVisible: false,
        headerStyle: styles.header,
        headerTintColor: colors.header_color,
    };

    render() {
        return (
            <ScrollView></ScrollView>
        );
    }
}


export default EventDetails;