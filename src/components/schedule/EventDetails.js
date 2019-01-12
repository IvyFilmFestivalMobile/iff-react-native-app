import React from 'react';
import {Image, Linking, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Divider, FAB, Headline, Paragraph, Subheading, Text, Title} from "react-native-paper";
import MapView from 'react-native-maps';
import moment from 'moment';
import HTMLView from "react-native-htmlview";
import {Button, MaterialHeaderButtons} from '../shared/MaterialHeader'
import {connect} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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

const htmlStyles = StyleSheet.create({
    p: {
        color: '#000000',
    },
});

class EventDetails extends React.PureComponent {
    constructor(props) {
        super(props);

        // Store initial saved status equivalent to event saved value
        // Relies on event saved property to update once save button is toggled
        this.state = {
            saved: this.props.navigation.state.params.saved
        };

        this.getDurationStrings = this.getDurationStrings.bind(this);
        this.openNativeDirectionsIntent = this.openNativeDirectionsIntent.bind(this);
        this.toggleSaved = this.toggleSaved.bind(this);
        this.goToEventbriteLink = this.goToEventbriteLink.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Event Details',
            headerStyle: styles.header,
            headerTintColor: colors.header_color,
            headerRight: (
                <MaterialHeaderButtons>
                    <Button title="Go to Eventbrite link" iconSource="MaterialCommunityIcons" iconName="eventbrite"
                            color={colors.header_color}
                            onPress={() => navigation.state.params.goToEventbriteLink()}/>
                    <Button title="Save Event"
                            iconName={navigation.state.params.saved ? "bookmark" : "bookmark-border"}
                            color={colors.header_color}
                            onPress={() => navigation.state.params.toggleSaved()}/>
                    <Button title="Share Event" iconName="share" color={colors.header_color}
                            onPress={() => navigation.state.params.shareEvent()}/>
                </MaterialHeaderButtons>
            ),
        });
    };

    getDurationStrings(startTime, endTime) { //TODO: Duplicate code maybe utilities class for events?
        const localStartTime = this.props.isEasternTime ? moment(startTime).tz("America/New_York") : moment(startTime);
        const localEndTime = this.props.isEasternTime ? moment(endTime).tz("America/New_York") : moment(endTime);

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

    toggleSaved() {
        // Negate event's saved property and update Card component
        this.props.navigation.state.params.toggleSavedState();

        // Negate saved param in navigation state to update header
        this.props.navigation.setParams({
            saved: !this.state.saved,
        });

        // Negate saved property for future param updates
        this.setState(currState => {
            return ({
                saved: !currState.saved
            });
        });
    }

    goToEventbriteLink() {
        Linking.openURL(this.props.navigation.state.params.event.url);
    }

    componentWillMount() {
        // Set navigation parameters for use in header
        this.props.navigation.setParams({
            toggleSaved: this.toggleSaved,
            goToEventbriteLink: this.goToEventbriteLink
        });
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
                <HTMLView value={event.description_html} stylesheet={htmlStyles}/>

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

const mapStateToProps = state => {
    return {isEasternTime: state.isEasternTime};
};

export default connect(mapStateToProps)(EventDetails);