import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import EventCard from "./EventCard";
import ScheduleFilterDialog from "./ScheduleFilterDialog";
import Storage from "../../utils/Storage";
import {Appbar, Text} from "react-native-paper";

class Schedule extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            filter: this.FilterEnum.UPCOMING,
            events: [],
            filteredEvents: [],
            savedEvents: [],
            loadingEvents: false
        };

        Storage.retrieveData('savedEvents')
            .then((storedSavedEvents) => this.setState({savedEvents: storedSavedEvents || []}));
        //Saved events still empty? till render. also retrieve here or in componentWillMount?

        this.fetchEvents = this.fetchEvents.bind(this);
        this.applyEventsFilter = this.applyEventsFilter.bind(this);
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
                </Appbar.Header>),
        });
    };

    openFilterDialog() {
        this.dialog.current.showDialog();
    }

    fetchEvents = async () => {
        const events = [];
        this.setState({loadingEvents: true});

        const apiCall = await fetch("https://o83q54u9ea.execute-api.us-east-1.amazonaws.com/prod");

        if (apiCall.ok) {
            const eventData = await apiCall.json();
            let currSavedEvents = this.state.savedEvents;
            if (typeof eventData !== 'undefined') {
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

                let currFilter = this.state.filter;
                this.setState({
                    events: events,
                    filteredEvents: this.applyEventsFilter(events, currFilter),
                    loadingEvents: false
                });
            }
        } else {
            console.log('Error parsing and retrieving event data');
            this.setState({loadingEvents: false});
        }
    };

    applyEventsFilter(events, filter) {
        switch (filter) {
            case this.FilterEnum.ALL:
                return events;
            case this.FilterEnum.UPCOMING:
                return events.filter(event => event.end > Date.now);
            case this.FilterEnum.SAVED:
                return events.filter(event => event.saved);
        }
    }

    async setFilter(newFilter) {
        await this.setState(currState => {
            return ({
                filter: newFilter,
                filteredEvents: this.applyEventsFilter(currState.events, newFilter)
            });
        });
    };

    addSavedEvent(eventId) {
        this.setState(currState => {
            currState.savedEvents.push(eventId);

            // Negate saved property of specified event
            currState.filteredEvents.find(event => event.id === eventId).saved =
                !currState.filteredEvents.find(event => event.id === eventId).saved;

            return {
                filteredEvents: currState.filteredEvents,
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
            currState.filteredEvents.find(event => event.id === eventId).saved =
                !currState.filteredEvents.find(event => event.id === eventId).saved;

            return {
                filteredEvents: currState.filteredEvents,
                savedEvents: currState.savedEvents
            };
        });

        this.updateSavedEventsStorage();
    }

    updateSavedEventsStorage() {
        Storage.storeData('savedEvents', this.state.savedEvents);
    }

    listEmptyText = (
        <View style={styles.loadingView}>
            <Text style={styles.loadingText}>No events to display</Text>
        </View>
    );

    async componentWillUnmount() {
        await Storage.storeData('savedEvents', this.state.savedEvents);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(nextState.filter === this.state.filter && nextState.events === this.state.events
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
            <EventCard event={event} navigation={this.props.navigation} addSavedEvent={this.addSavedEvent}
                       removeSavedEvent={this.removeSavedEvent} key={event.id.toString()}/>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loadingEvents}
                            onRefresh={this.fetchEvents}
                        />}
                    data={this.state.filteredEvents}
                    renderItem={({item}) => this.renderEventCard(item)}
                    keyExtractor={(event) => event.id.toString()}
                    ListEmptyComponent={this.listEmptyText}
                />

                <ScheduleFilterDialog ref={this.dialog} currFilter={this.state.filter} setFilter={this.setFilter}/>
            </View>
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