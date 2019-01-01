import React from 'react';
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import EventCard from "./EventCard";
import ScheduleFilterDialog from "./ScheduleFilterDialog";
import EventStorage from "./EventStorage";
import {EVENTBRITE_API_KEY, IFF_ORG_ID} from '../../Constants';
import {Appbar, Text} from "react-native-paper";

class Schedule extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            filter: this.FilterEnum.UPCOMING,
            events: [],
            savedEvents: [],
            loadingEvents: false
        };

        EventStorage.retrieveData('savedEvents')
            .then((storedSavedEvents) => this.setState({savedEvents: storedSavedEvents || []}));
        //Saved events still empty? till render. also retrieve here or in componentWillMount?

        this.getEvents = this.getEvents.bind(this);
        this.getEventsAndUpdate = this.getEventsAndUpdate.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.dialog = React.createRef();
        this.openFilterDialog = this.openFilterDialog.bind(this);
        this.addSavedEvent = this.addSavedEvent.bind(this);
        this.removeSavedEvent = this.removeSavedEvent.bind(this);
        this.updateSavedEventsStorage = this.updateSavedEventsStorage.bind(this);
    }

    FilterEnum = {ALL: 1, UPCOMING: 2, SAVED: 3};

    static navigationOptions = ({navigation}) => {
        return ({
            header: (
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Schedule'} color={colors.header_color}/>
                    <Appbar.Action icon={'filter-list'} onPress={() => navigation.state.params.openFilterDialog()}
                                   color={colors.header_color}/>
                    <Appbar.Action icon={'bookmark'} color={colors.header_color}/>
                </Appbar.Header>),
        });
    };

    openFilterDialog() {
        this.dialog.current.showDialog();
    }

    getEvents = async (filter, date) => {
        const events = [];
        this.setState({loadingEvents: true});

        try {
            const apiCall = await fetch(`https://www.eventbriteapi.com/v3/organizations/${IFF_ORG_ID}/events/?expand=venue`, {
                headers: new Headers({
                    'Authorization': 'Bearer ' + EVENTBRITE_API_KEY,
                    'Content-Type': 'application/json'
                })
            });
            const eventData = await apiCall.json();

            let currSavedEvents = this.state.savedEvents;
            if (typeof eventData !== 'undefined') {
                switch (filter) {
                    case this.FilterEnum.ALL:
                        eventData.events.forEach(function (element) {
                            let savedEventStatus = currSavedEvents.includes(element.id);
                            events.push({
                                name: element.name.text,
                                description: element.description.text,
                                description_html: element.description.html,
                                id: element.id,
                                url: element.url,
                                start: element.start.utc,
                                end: element.end.utc,
                                image_url: element.logo.url, //logo.original.url 8x longer
                                location: {
                                    name: element.venue.name,
                                    latitude: element.venue.latitude,
                                    longitude: element.venue.longitude,
                                    address_display: element.venue.address.localized_multi_line_address_display
                                },
                                saved: savedEventStatus,
                            });
                        });
                        break;
                    case this.FilterEnum.UPCOMING:
                        eventData.events.forEach(function (element) {
                            let savedEventStatus = currSavedEvents.includes(element.id);
                            if (element.end.utc >= date) {
                                events.push({
                                    name: element.name.text,
                                    description: element.description.text,
                                    description_html: element.description.html,
                                    id: element.id,
                                    url: element.url,
                                    start: element.start.utc,
                                    end: element.end.utc,
                                    image_url: element.logo.url, //logo.original.url 8x longer
                                    location: {
                                        name: element.venue.name,
                                        latitude: element.venue.latitude,
                                        longitude: element.venue.longitude,
                                        address_display: element.venue.address.localized_multi_line_address_display
                                    },
                                    saved: savedEventStatus,
                                });
                            }
                        });
                        break;
                    case this.FilterEnum.SAVED:
                        break;
                }
            }
        } catch (error) {
            console.log('Error parsing and retrieving event data');
            this.setState({loadingEvents: false});
            throw error;
        }


        return events;
    };

    async getEventsAndUpdate() {
        const newEvents = await this.getEvents(this.state.filter, Date.now());

        this.setState({
            events: newEvents,
            loadingEvents: false,
            refreshing: false
        });
    }

    // TODO: very slow to update scrollview due to long event list. mb bring loading higher and either display spinner or scrollview
    async setFilter(newFilter) {
        await this.setState({filter: newFilter}); //Doesn't refresh on getEventsAndUpdate() so this is alternative
        this.getEventsAndUpdate();
    };

    //TODO: Consider moving event storage funcs to different class
    addSavedEvent(eventId) {
        this.setState(currState => {
            currState.savedEvents.push(eventId);

            // Negate saved property of specified event
            // TODO: possibly replace savedEvents array by storing events with saved=true
            currState.events.find(event => event.id === eventId).saved =
                !currState.events.find(event => event.id === eventId).saved;

            return {
                events: currState.events,
                savedEvents: currState.savedEvents
            };
        });

        this.updateSavedEventsStorage();
    }

    removeSavedEvent(eventId) {
        this.setState(currState => {
            for (let i = 0; i < currState.savedEvents.length; i++) {
                if (currState.savedEvents[i] === eventId) {
                    currState.savedEvents.splice(i, 1);
                }
            }

            // Negate saved property of specified event
            currState.events.find(event => event.id === eventId).saved =
                !currState.events.find(event => event.id === eventId).saved;

            return {
                events: currState.events,
                savedEvents: currState.savedEvents
            };
        });

        this.updateSavedEventsStorage();
    }

    updateSavedEventsStorage() {
        EventStorage.storeData('savedEvents', this.state.savedEvents);
    }

    async componentDidMount() {
        this.getEventsAndUpdate();
        this.props.navigation.setParams({
            openFilterDialog: this.openFilterDialog
        });
    }

    async componentWillUnmount() {
        await EventStorage.storeData('savedEvents', this.state.savedEvents);
    }

    render() {
        const EventCards = (typeof this.state.events !== 'undefined') && this.state.events.length ?
            this.state.events.map((event, eventKey) => {
                return (
                    <EventCard event={event} navigation={this.props.navigation} addSavedEvent={this.addSavedEvent}
                               removeSavedEvent={this.removeSavedEvent} key={eventKey}/>
                );
            }) :
            this.state.loadingEvents ?
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color={colors.spinner_color}/>
                    <Text style={styles.loadingText}>Loading events...</Text>
                </View> :
                <View style={styles.loadingView}>
                    <Text style={styles.loadingText}>No events to display</Text>
                </View>;

        return (
            <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.getEventsAndUpdate}
                />
            }>
                <ScheduleFilterDialog ref={this.dialog} currFilter={this.state.filter} setFilter={this.setFilter}/>
                {EventCards}
            </ScrollView>
        );
    }
}

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff',
    spinner_color: '#0e3737'
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.header_background_color,
    },
    content: {
        padding: 4,
    },
    scrollContainer: {
        flexGrow: 1
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

export default Schedule;