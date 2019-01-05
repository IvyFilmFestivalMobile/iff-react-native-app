import React from 'react';
import {ScrollView, Keyboard, StyleSheet} from 'react-native';
import {Appbar} from "react-native-paper";
import {FILMS, MOVIE_QUERY} from '../../Constants';
import FilmCard from './FilmCard';
import { SearchBar } from 'react-native-elements';


class Films extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            searching: false,
            query: '',
            bar:<SearchBar 
                autoFocus= {true}
                placeholder='Type Here...' 
                ref={search => this.search = search}
                onCancel= {this.toggleSearch}/>,
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
            return this.state.bar;
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
        
        
        const { films } = this.state;
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
        <ScrollView>{this.showSearchBar()}{cards}</ScrollView>  
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