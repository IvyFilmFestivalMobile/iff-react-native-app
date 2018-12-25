import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';

class EventCard extends React.Component {

    /**
     * Extracts first sentence in event description
     *
     * TODO: Previously attempted to extract first paragraph or hook sentence but eventbrite formatting whack. Replace later. also test
     * @param description
     * @returns {string}
     */
    shortenDescription(description) {
        const indexOfFirstPunctuation = /([.!?])/.exec(description).index;
        return description.substr(0, indexOfFirstPunctuation + 1);
    }

    render() {
        return (
            <Card style={styles.card}>
                <Card.Cover source={{uri: this.props.image_url}}/>
                <Card.Content>
                    <Title>{this.props.name}</Title>
                    <Paragraph>{this.shortenDescription(this.props.description)}</Paragraph>
                </Card.Content>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 7,
    },
});

export default EventCard;