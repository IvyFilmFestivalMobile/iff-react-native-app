import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Linking, MapView} from 'expo';
import {Divider, FAB, Headline, Paragraph, Subheading, Text, Title} from "react-native-paper";
import moment from 'moment';
import {MaterialIcons} from '@expo/vector-icons';
import HTMLView from "react-native-htmlview";

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff',
    fab_color: '#ee5956',
    fab_icon_color: '#ffffff',
};

const styles = StyleSheet.create({
    viewContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    section: {
        marginTop: 15,
    },
    header: {
        backgroundColor: colors.header_background_color, //TODO: make universal don't copy
    },
    bannerImage: {
        alignSelf: 'stretch',
        height: 200, //Doesn't really work with different values or screens. 250 causes whitespace above???
    },
    mapView: {
        alignSelf: 'stretch',
        height: 400,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: colors.fab_color,
    },
    bottomSpacing: {
        marginBottom: 30
    }
});

class EventDetails extends React.Component {
    constructor(props) {
        super(props);

        this.getDurationStrings = this.getDurationStrings.bind(this);
        this.openNativeDirectionsIntent = this.openNativeDirectionsIntent.bind(this);
    }

    static navigationOptions = {
        title: 'Event Details',
        headerStyle: styles.header,
        headerTintColor: colors.header_color,
    };

    getDurationStrings(startTime, endTime) {
        const localStartTime = moment(startTime);
        const localEndTime = moment(endTime);

        const dateDurationStr = localStartTime.format("dddd, MMMM DD, YYYY");
        const timeDurationStr = localStartTime.format("LT") + " - " + localEndTime.format("LT");

        return [dateDurationStr, timeDurationStr];
    }

    openNativeDirectionsIntent(location) {
        const locationString = location.latitude + '%2C' + location.longitude;

        if (Platform.OS === "ios") {
            Linking.openURL('https://maps.apple.com/maps?daddr=' + locationString);
        } else if (Platform.OS === "android") {
            Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + locationString);
        }
    }

    render() {
        const {event} = this.props.navigation.state.params;

        const mapRegion = {
            latitude: parseFloat(event.location.latitude),
            longitude: parseFloat(event.location.longitude),
            latitudeDelta: 0.0035,
            longitudeDelta: 0.0035,
        };

        const eventLocation = {
            latitude: parseFloat(event.location.latitude),
            longitude: parseFloat(event.location.longitude),
        };

        //TODO: Perhaps also collect current location and adjust map
        return (
            <ScrollView contentContainerStyle={styles.viewContainer}>
                <Image source={{uri: event.image_url}}
                       resizeMode='contain' style={styles.bannerImage}/>

                <Title>{event.name}</Title>
                <Subheading>
                    <MaterialIcons
                        style={{backgroundColor: 'transparent'}}
                        name={'event'}
                    />
                    {"  " + this.getDurationStrings(event.start, event.end)[0]}
                </Subheading>
                <Subheading>
                    <MaterialIcons
                        style={{backgroundColor: 'transparent'}}
                        name={'access-time'}
                    />
                    {"  " + this.getDurationStrings(event.start, event.end)[1]}
                </Subheading>
                <Subheading>
                    <MaterialIcons
                        style={{backgroundColor: 'transparent'}}
                        name={'location-on'}
                    />
                    {"  " + event.location.name}
                </Subheading>

                <Headline style={styles.section}>Description</Headline>
                <Divider/>
                <HTMLView value={event.description_html}/>

                <Headline style={styles.section}>Location</Headline>
                <Divider/>
                <Text>{event.location.name}</Text>
                {event.location.address_display.map((addressLine, key) => {
                    return (<Paragraph key={key}>{addressLine}</Paragraph>);
                })}
                <View style={styles.bottomSpacing}>
                    <MapView region={mapRegion} style={styles.mapView} places={[eventLocation]}>
                        <MapView.Marker
                            coordinate={eventLocation}
                            title={event.location.name}
                        />
                    </MapView>
                    <FAB
                        style={styles.fab}
                        icon="directions"
                        onPress={() => this.openNativeDirectionsIntent(event.location)}
                        color={colors.fab_icon_color}
                    />
                </View>
            </ScrollView>
        );
    }
}


export default EventDetails;