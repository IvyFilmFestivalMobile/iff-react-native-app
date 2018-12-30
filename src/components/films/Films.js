import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from "../shared/Header";
import MaterialTabBarIcon from "../shared/MaterialTabBarIcon";
import {Card, Appbar, Text} from "react-native-paper";
import {MOVIE_QUERY, MOVIE_FIELDS} from '../../Constants';
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

    async componentDidMount() {
        try {
            const endpoint =
                MOVIE_QUERY.BASE_URL + MOVIE_QUERY.SEARCH_QUERY +  "Forrest Gump" + "&" + MOVIE_QUERY.API_KEY;
            const apiCall = 
                await fetch(endpoint);
            const filmData = 
                await apiCall.json();
                this.setState(prevState => ({
                    films: [...prevState.films, filmData.results[0]]
                }));
                this.setState({loading: false});
        } catch(err) {
            console.log("error in fetching data", err);
        }
    }

    render() {
        
        const { films, loading } = this.state;
        if(!loading) {
            return(
            
                films.map((film) => {
                    return (
                        // <FilmCard synopsis={film.overview} />
                        <Card>
                            <Text>{film.overview}</Text>
                        </Card>
                    )
                }) 
                // <Card>
                //     <Text>{this.state.films[0]}</Text>
                // </Card>
                // <FilmCard synopsis= {this.state.films[0].overview}/>
                // source = {MOVIE_QUERY.IMAGE_URL + this.state.films[0].poster_path}/>
                // <FilmCard></FilmCard>    
                
            );
        }
        else {
            console.log("err");
            return null;
        }
        
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