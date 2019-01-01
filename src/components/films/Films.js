import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from "../shared/Header";
import MaterialTabBarIcon from "../shared/MaterialTabBarIcon";
import {Card, Appbar, Text} from "react-native-paper";
import {MOVIE_QUERY, MOVIE_FIELDS, FILMS} from '../../Constants';
import FilmCard from './FilmCard';

class Films extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            loading: true,
        };    
    }
   
    
    
    static navigationOptions = ({navigation}) => {
        return ({
            header: (
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Films'} color={colors.header_color}/>
                    <Appbar.Action icon={'search'} onPress= {this.searchMovies}
                     color={colors.header_color}/>
                    
                </Appbar.Header>),
        });
    };
    

    searchmovies = () => {
        this.setState({loading: true});
    }

    // async componentDidMount() {
        
    //     try {
    //         FILMS.forEach(async function(film) {
    //             // console.log(film);
    //             const endpoint = MOVIE_QUERY.BASE_URL + MOVIE_QUERY.SEARCH_QUERY +  film + "&" + MOVIE_QUERY.API_KEY;
    //             const apiCall = await fetch(endpoint);  
    //             const filmData = 
    //                 await apiCall.json();
    //                 console.log(filmData);
    //                 this.setState(prevState => ({
    //                     films: [...prevState.films, filmData.results[0]]
    //                 }));
    //                 // this.setState({loading: false});
    //         });
    //         // this.setState
    //         this.setState({loading: false});
    //         // const endpoint = MOVIE_QUERY.BASE_URL + MOVIE_QUERY.SEARCH_QUERY +  "Forrest Gump" + "&" + MOVIE_QUERY.API_KEY;
    //         // const apiCall = await fetch(endpoint);  
    //         // const filmData = 
    //         //     await apiCall.json();
    //         //     this.setState(prevState => ({
    //         //         films: [...prevState.films, filmData.results[0]]
    //         //     }));
    //         //     this.setState({loading: false});
    //     } catch(err) {
    //         return(err);
    //     }
    // }
    getEndpoint = (title) => {
        return MOVIE_QUERY.BASE_URL + MOVIE_QUERY.SEARCH_QUERY +  title + "&" + MOVIE_QUERY.API_KEY;
    }
    componentDidMount() {
    
        Promise.all(FILMS.map(film => fetch(this.getEndpoint(film))
        .then(res => res.json())
        .then(filmData => {
            this.setState(prevState => ({
                films: [...prevState.films, filmData.results[0]]    
        }))})));

        // fetch("https://api.themoviedb.org/3/movie/13?api_key=151dfa1b4c6a83a02970c0c6612615b3")
        // .then(info => info.json())
        // .then(data => console.log(data));
    }

    render() {
        
        const { films, loading } = this.state;
        const cards = films.map((film, key) => {
            return (
                <FilmCard synopsis={film.overview} 
                image_url= {MOVIE_QUERY.IMAGE_URL + film.poster_path}
                film_name = {film.title}
                release_date = {film.release_date}
                key = {key}/>
            )
        });

        return(
            <ScrollView>{cards}</ScrollView>  
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

export default Films;