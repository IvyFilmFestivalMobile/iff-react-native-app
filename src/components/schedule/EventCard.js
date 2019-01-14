import React from 'react';
import moment from "moment";
import "moment-timezone";
import {Share, StyleSheet} from 'react-native';
import {Card, IconButton, Subheading, Title} from 'react-native-paper';
import {connect} from 'react-redux';

class EventCard extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            saved: this.props.event.saved
        };

        this.getDurationStrings = this.getDurationStrings.bind(this);
        this.toggleSavedState = this.toggleSavedState.bind(this);
        this.shareEvent = this.shareEvent.bind(this);
    }

    getDurationStrings(startTime, endTime) { //TODO: called twice maybe render components here to return instead
        const localStartTime = this.props.isEasternTime ? moment(startTime).tz("America/New_York") : moment(startTime);
        const localEndTime = this.props.isEasternTime ? moment(endTime).tz("America/New_York") : moment(endTime);

        const dateDurationStr = localStartTime.format("dddd, MMMM DD, YYYY");
        const timeDurationStr = localStartTime.format("LT") + " - " + localEndTime.format("LT");

        return [dateDurationStr, timeDurationStr];
    }

    async toggleSavedState() {
        await this.setState(currState => {
            return {saved: !currState.saved}
        });

        this.props.toggleSavedEvent(this.props.event.id);
    }

    async shareEvent() {
        const shareTitle = 'Join Ivy Film Festival @ ' + this.props.event.name;
        await Share.share({
            message: this.props.event.url,
            title: shareTitle,
            url: this.props.event.url, //What does this do on IOS?
        }, {
            subject: shareTitle,
            dialogTitle: 'Share event link'
        });
    }

    render() {
        return (
            <Card style={styles.card} onPress={() => {
                this.props.navigation.navigate('EventDetails', {
                    event: this.props.event,
                    saved: this.props.event.saved,
                    shareEvent: this.shareEvent,
                    toggleSavedState: this.toggleSavedState
                })
            }}>
                <Card.Cover source={{uri: this.props.event.image_url}}/>
                <Card.Content>
                    <Title style={styles.title}>{this.props.event.name}</Title>
                    <Subheading>{this.getDurationStrings(this.props.event.start, this.props.event.end)[0]}</Subheading>
                    <Subheading>{this.getDurationStrings(this.props.event.start, this.props.event.end)[1]}</Subheading>
                </Card.Content>
                <Card.Actions style={styles.actions}>
                    <IconButton icon={this.state.saved ? 'bookmark' : 'bookmark-border'}
                                onPress={() => this.toggleSavedState()}/>
                    <IconButton icon={'share'} onPress={this.shareEvent}/>
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

const mapStateToProps = state => {
    return {isEasternTime: state.isEasternTime};
};

export default connect(mapStateToProps)(EventCard);