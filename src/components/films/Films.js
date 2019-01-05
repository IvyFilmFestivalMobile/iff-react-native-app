import React from 'react';
import {Text, ScrollView, Keyboard, StyleSheet} from 'react-native';
import {Appbar} from "react-native-paper";
import {FILMS, MOVIE_QUERY} from '../../Constants';
import FilmCard from './FilmCard';
import { SearchBar } from 'react-native-elements';


class Films extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            query: '',
            searching: false,
            keyboard: false
        };    
    }
   
    toggleSearch = () => {  
        this.setState({
            searching: !this.state.searching
        });
    }
    
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return ({
            header: (
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Films'} color={colors.header_color}/>
                    <Appbar.Action icon={'search'} onPress= {params.handle}/> 
                    
                </Appbar.Header>),
        });
    };
    
    keyboardDidHide = () => {
        if(this.state.searching) {
            this.toggleSearch();
        }        
    };

    showSearchBar = () => {
        
        if(this.state.searching) {
            // BackHandler.addEventListener('hardwareBackPress', () => {
            //     this.toggleSearch();
            // });
            // return this.search;
            return (<SearchBar 
                lightTheme
                round
                autoFocus= {true}
                placeholder='Type Here...' 
                ref={search => this.search = search}
                onChangeText= {text => this.setState({query: text})}
                value = {this.state.query}
                onCancel= {this.toggleSearch}/>);
        }
       else {
            return null;
        }
           
        
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
    };

    getCards = (films) => {
        const cards = films.map((film, key) => {
            return (
                <FilmCard synopsis={film.overview} 
                image_url= {MOVIE_QUERY.IMAGE_URL + film.poster_path}
                film_name = {film.title}
                release_date = {film.release_date}
                key = {key}/>
            )
        });
        if(cards.length > 0) {
            return cards;
        }
        else {
            // Todo: style this text
            return <Text style= {{margin: 5}}>No result was found</Text>;
        }


    };

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

        Promise.all(FILMS.map(film => fetch(this.getEndpoint(film))
        .then(res => res.json())
        .then(filmData => {
            this.setState(prevState => ({
                films: [...prevState.films, filmData.results[0]]    
        }))})));

        this.props.navigation.setParams({
            handle: this.toggleSearch,

        });
        

        // fetch("https://api.themoviedb.org/3/movie/13?api_key=151dfa1b4c6a83a02970c0c6612615b3")
        // .then(info => info.json())
        // .then(data => console.log(data));
    }
    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    render() {
        
        
        const { films, query } = this.state;
        const newFilms = films.filter(item => {
            const data = item.title.toUpperCase();
            return data.indexOf(query.toUpperCase()) > -1;
        });
        return(
        <ScrollView>{this.showSearchBar()}{this.getCards(newFilms)}</ScrollView>  
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