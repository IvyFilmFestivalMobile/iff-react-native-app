import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FATabBarIcon from "../shared/FATabBarIcon";
import EventCard from "./EventCard";
import {EVENTBRITE_API_KEY, IFF_ORG_ID} from '../../Constants';
import {Appbar, Text} from "react-native-paper";

class Schedule extends React.Component {
    static navigationOptions = {
        tabBarIcon: FATabBarIcon('calendar'),
    };
    FilterEnum = {ALL: 1, UPCOMING: 2, SAVED: 3};

    constructor(props) {
        super(props);

        this.state = {
            //TODO: filter: FilterEnum.UPCOMING,
            events: [],
            loadingEvents: false
        };

        this.getEvents = this.getEvents.bind(this);
    }

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
            this.setState({loadingEvents: false})
            throw error;
        }


        return events;
    };

    componentDidMount() {
        this.getEvents(this.FilterEnum.UPCOMING, Date.now())
            .then((eventsArr) => this.setState({events: eventsArr, loadingEvents: false}));
    }

    render() {
        const EventCards = this.state.events.length ?
            this.state.events.map((event, eventKey) => {
                return (
                    <EventCard name={event.name} description={event.description}
                               image_url={event.image_url} key={eventKey}/>
                );
            }) : this.state.loadingEvents ? <Text>Loading...</Text> : <Text>No events to display</Text>;
        //TODO: chg to spinner

        return ( //spans from top to bottom of window. later make appbar be outside and stick to top
            <ScrollView>
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Schedule'} color={colors.header_color}/>
                    <Appbar.Action icon={'bookmark'} color={colors.header_color}/>
                </Appbar.Header>

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
    }
});

export default Schedule;