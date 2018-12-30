// BASE_URL: "https://api.themoviedb.org/3/",
// IMAGE_URL: "http://image.tmdb.org/t/p/w185",
// API_KEY: "api_key=151dfa1b4c6a83a02970c0c6612615b3",
// SEARCH_QUERY: "search/movie?query=",
// PLACEHOLDER_IMAGE: "https://s3-ap-southeast-1.amazonaws.com/popcornsg/placeholder-movieimage.png"
// },
// var endpoint =
//         Constants.URL.BASE_URL + Constants.URL.SEARCH_QUERY + this.state.searchText + "&" + Constants.URL.API_KEY;

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