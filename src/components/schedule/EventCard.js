import React from 'react';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {Card, IconButton, Subheading, Title} from 'react-native-paper';

class EventCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: this.props.event.saved
        };

        this.getDurationStrings = this.getDurationStrings.bind(this);
        this.toggleSavedState = this.toggleSavedState.bind(this);
    }

    getDurationStrings(startTime, endTime) {
        const localStartTime = moment(startTime);
        const localEndTime = moment(endTime);

        const dateDurationStr = localStartTime.format("dddd, MMMM DD, YYYY");
        const timeDurationStr = localStartTime.format("LT") + " - " + localEndTime.format("LT");

        return [dateDurationStr, timeDurationStr];
    }

    async toggleSavedState() {
        await this.setState(currState => {
            return {saved: !currState.saved}
        });

        if (this.state.saved) {
            this.props.addSavedEvent(this.props.event.id);
        } else {
            this.props.removeSavedEvent(this.props.event.id);
        }
    }

    render() {
        return (
            <Card style={styles.card} onPress={() => {
                this.props.navigation.navigate('EventDetails', {event: this.props.event})
            }}>
                <Card.Cover source={{uri: this.props.event.image_url}}/>
                <Card.Content>
                    <Title style={styles.title}>{this.props.event.name}</Title>
                    <Subheading>{this.getDurationStrings(this.props.event.start, this.props.event.end)[0]}</Subheading>
                    <Subheading>{this.getDurationStrings(this.props.event.start, this.props.event.end)[1]}</Subheading>
                    {/*<Paragraph>{this.shortenDescription(this.props.description)}</Paragraph>*/}
                </Card.Content>
                <Card.Actions style={styles.actions}>
                    <IconButton icon={this.state.saved ? 'bookmark' : 'bookmark-border'}
                                onPress={() => this.toggleSavedState()}/>
                    <IconButton icon={'share'}/>
                </Card.Actions>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 7,
    },
    fab: {
        position: 'absolute',
        marginBottom: -20,
        marginRight: 12,
        right: 0,
        bottom: 0,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default EventCard;