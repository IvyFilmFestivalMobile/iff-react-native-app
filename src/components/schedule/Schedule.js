import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import EventCard from "./EventCard";
import {EVENTBRITE_API_KEY, IFF_ORG_ID} from '../../Constants';
import {Appbar, Text} from "react-native-paper";

const header = () => {
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Content title={'Schedule'} color={colors.header_color}/>
            <Appbar.Action icon={'refresh'} onPress={() => {
                this.getEventsAndUpdate()
            }} color={colors.header_color}/>
            <Appbar.Action icon={'filter-list'} color={colors.header_color}/>
            <Appbar.Action icon={'bookmark'} color={colors.header_color}/>
        </Appbar.Header>
    );
};

class Schedule extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            filter: this.FilterEnum.ALL, // TODO: UP
            events: [],
            loadingEvents: false
        };

        this.getEvents = this.getEvents.bind(this);
        this.getEventsAndUpdate = this.getEventsAndUpdate.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    FilterEnum = {ALL: 1, UPCOMING: 2, SAVED: 3};

    static navigationOptions = () => {
        return ({
            header: header,
        });
    };

    getEvents = async (filter, date) => {
        const events = [];
        this.setState({loadingEvents: true});

        try {
            const apiCall = await fetch(`https://www.eventbriteapi.com/v3/organizations/${IFF_ORG_ID}/events`, {
                headers: new Headers({
                    'Authorization': 'Bearer ' + EVENTBRITE_API_KEY,
                    'Content-Type': 'application/json'
                })
            });
            const eventData = await apiCall.json();

            if (typeof eventData !== 'undefined') {
                switch (filter) {
                    case this.FilterEnum.ALL:
                        eventData.events.forEach(function (element) {
                            events.push({
                                name: element.name.text,
                                description: element.description.text,
                                url: element.url,
                                start: element.start.utc,
                                end: element.end.utc,
                                image_url: element.logo.url //logo.original.url 8x longer
                            });
                        });
                        break;
                    case this.FilterEnum.UPCOMING:
                        eventData.events.forEach(function (element) {
                            if (element.end.utc >= date) {
                                events.push({
                                    name: element.name.text,
                                    description: element.description.text,
                                    url: element.url,
                                    start: element.start.utc,
                                    end: element.end.utc,
                                    image_url: element.logo.url //logo.original.url 8x longer
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

    getEventsAndUpdate() {
        this.getEvents(this.state.filter, Date.now())
            .then((eventsArr) => this.setState({events: eventsArr, loadingEvents: false}));
    }

    setFilter(newFilter) {
        this.setState({filter: newFilter});
    };

    componentDidMount() {
        this.getEventsAndUpdate();
    }

    render() {
        const EventCards = (typeof this.state.events !== 'undefined') && this.state.events.length ?
            this.state.events.map((event, eventKey) => {
                return (
                    <EventCard event={event} navigation={this.props.navigation} key={eventKey}/>
                );
            }) :
            this.state.loadingEvents ?
                <Text style={styles.loadingText}>Loading...</Text> :
                <Text style={styles.loadingText}>No events to display</Text>;
        //TODO: chg to spinner

        return (
            <ScrollView>
                {EventCards}
            </ScrollView>
        );
    }
}

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff'
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.header_background_color,
    },
    content: {
        padding: 4,
    },
    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

export default Schedule;