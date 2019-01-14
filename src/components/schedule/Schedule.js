import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import EventCard from "./EventCard";
import ScheduleFilterDialog from "./ScheduleFilterDialog";
import Storage from "../../utils/Storage";
import {Appbar, FAB, Text} from "react-native-paper";
import EventFilterEnum from "./EventFilterEnum";
import {connect} from "react-redux";

class Schedule extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            events: [],
            loadingEvents: false
        };

        this.fetchEvents = this.fetchEvents.bind(this);
        this.applyEventsFilter = this.applyEventsFilter.bind(this);
        this.dialog = React.createRef();
        this.openFilterDialog = this.openFilterDialog.bind(this);
        this.toggleSavedEvent = this.toggleSavedEvent.bind(this);
    }

    lastEventId = "";

    //Maybe just change to title instead of full header element
    static navigationOptions = ({navigation}) => {
        return ({
            header: (
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Schedule'} color={colors.header_color}/>
                </Appbar.Header>),
        });
    };

    openFilterDialog() {
        this.dialog.current.showDialog();
    }

    fetchEvents = async () => {
        this.setState({loadingEvents: true});
        // Initialize events to current events to avoid rewriting on updates from API
        let events = this.state.events;

        // Check if initial load of component and attempt to retrieve events from storage
        if (this.lastEventId === "") {
            events = await Storage.retrieveData("events") || []; // || events

            // Check if events exist in storage and fetch starting from lastEventId
            if (events.length !== 0) {
                this.lastEventId = events[events.length - 1].id;
            }
        }

        try {
            const apiCall =
                await fetch(`https://o83q54u9ea.execute-api.us-east-1.amazonaws.com/prod?lastId=${this.lastEventId}`);
            if (apiCall.ok) {
                const eventData = await apiCall.json();
                if (typeof eventData !== 'undefined') {
                    eventData.events.forEach(function (element) {
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
                            saved: false,
                        });
                    });

                    this.setState({
                        events: events,
                        loadingEvents: false
                    });
                }
            } else {
                console.log('API call not ok'); //Don't log error to console. TODO: Separate logging and error display
                this.setState({
                    events: events,
                    loadingEvents: false
                });
            }
        } catch (exception) {
            console.log('Error parsing and retrieving event data');
            this.setState({
                events: events,
                loadingEvents: false
            });
        }

        if (events.length !== 0) {
            this.lastEventId = events[events.length - 1].id;
            Storage.storeData("events", events);
        }
    };

    applyEventsFilter(events, filter) {
        switch (filter) {
            case EventFilterEnum.ALL:
                return events;
            case EventFilterEnum.UPCOMING:
                return events.filter(event => event.end > Date.now);
            case EventFilterEnum.SAVED:
                return events.filter(event => event.saved);
        }
    }

    toggleSavedEvent(eventId) {
        this.setState(currState => {
            // Toggle saved property of specified event
            let eventIndex = currState.events.findIndex(event => event.id === eventId);
            currState.events[eventIndex].saved = !currState.events[eventIndex].saved;

            return {
                events: currState.events
            };
        });

        Storage.storeData("events", this.state.events);
    }

    // TODO: is spinner enough to indicate loading?
    listEmptyText = () => {
        return this.state.loadingEvents
            ? (<View style={styles.loadingView}>
                <Text style={styles.loadingText}>Loading events...</Text>
            </View>)
            : (<View style={styles.loadingView}>
                <Text style={styles.loadingText}>No events to display</Text>
            </View>);
    };

    async componentWillUnmount() {
        await Storage.storeData('savedEvents', this.state.savedEvents);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(nextProps.eventFilter === this.props.eventFilter && nextState.events === this.state.events
            && nextState.loadingEvents === this.state.loadingEvents);
    }

    async componentDidMount() { //or WillMount?
        this.props.navigation.setParams({
            openFilterDialog: this.openFilterDialog
        });
        await this.fetchEvents();
    }

    renderEventCard(event) {
        return (
            <EventCard event={event} navigation={this.props.navigation} toggleSavedEvent={this.toggleSavedEvent}
                       key={event.id.toString()}/>
        );
    }

    render() {
        const filteredEvents = this.applyEventsFilter(this.state.events, this.props.eventFilter);
        return (
            <View style={styles.rootContainer}>
                <FlatList
                    contentContainerStyle={styles.scrollContainer}
                    refreshing={this.state.loadingEvents}
                    onRefresh={this.fetchEvents}
                    data={filteredEvents}
                    renderItem={({item}) => this.renderEventCard(item)}
                    keyExtractor={(event) => event.id.toString()}
                    ListEmptyComponent={this.listEmptyText}
                />

                <FAB
                    style={styles.filterFab}
                    icon={'filter-list'}
                    color={colors.fab_icon_color}
                    onPress={this.openFilterDialog}
                />

                <ScheduleFilterDialog ref={this.dialog}/>
            </View>
        );
    }
}

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff',
    spinner_color: '#0e3737',
    fab_icon_color: '#ffffff',
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.header_background_color,
    },
    content: {
        padding: 4,
    },
    rootContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 72,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    filterFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: colors.header_background_color //TODO: rename to primary color
    },
});

const mapStateToProps = state => {
    return {eventFilter: state.eventFilter};
};

export default connect(mapStateToProps)(Schedule);