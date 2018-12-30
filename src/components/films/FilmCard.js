import React from 'react';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {Card, Text, IconButton, Subheading, Title} from 'react-native-paper';

class FilmCard extends React.Component {

    render() {
        return (
            <Card>
                {/* <Card.Cover source={{uri: this.props.film.image_url}}/> */}
                <Text>
                    {this.props.film.synopsis}
                </Text>
            </Card>
        );
    }
}

export default FilmCard;