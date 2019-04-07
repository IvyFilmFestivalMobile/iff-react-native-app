import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Text} from "react-native-paper";
import FilmCard from './FilmCard';
import Storage from "../../utils/Storage";

class Films extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            loadingFilms: false,
        };

        this.fetchFilms = this.fetchFilms.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return ({
            header: (
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Films'} color={colors.header_color}/>
                </Appbar.Header>),
        });
    };

    // TODO: bring back search and customize film cards with more description and functionality

    async fetchFilms() {
        this.setState({loadingFilms: true});

        // Initialize events to current events to avoid rewriting on updates from API
        let films = [];

        try {
            const apiCall =
                await fetch(`https://ivyfilmfestivalmobile.github.io/iff-backend/api/festivalFilms.json`);
            if (apiCall.ok) {
                const filmData = await apiCall.json();
                if (typeof filmData !== 'undefined') {
                    filmData.films.forEach(function (element) {
                        films.push({
                            title: element.title,
                            description: element.description,
                            id: element.id,
                            poster_url: element.poster_path,
                            release_date: element.release_date,
                            time: element.time,
                            location: element.location,
                            saved: false,
                        });
                    });
                }
            } else {
                console.log('API call not ok'); //Don't log error to console. TODO: Separate logging and error display
            }
        } catch (exception) {
            console.log('Error parsing and retrieving film data');
        } finally {
            this.setState({
                films: films,
                loadingFilms: false
            });

            if (films.length !== 0) {
                Storage.storeData("films", films); // TODO: cache
            }
        }
    }

    listEmptyText = () => {
        return this.state.loadingEvents
            ? (<View style={styles.loadingView}>
                <Text style={styles.loadingText}>Loading films...</Text>
            </View>)
            : (<View style={styles.loadingView}>
                <Text style={styles.loadingText}>No films to display</Text>
            </View>);
    };

    renderFilmCard(film) {
        return (
            <FilmCard film={film} navigation={this.props.navigation}
                      key={film.id.toString()}/>
        );
    }

    async componentDidMount() {
        await this.fetchFilms();
    }

    render() {
        //Todo: loading screen
        return(
            <View style={styles.rootContainer}>
                <FlatList
                    contentContainerStyle={styles.scrollContainer}
                    refreshing={this.state.loadingFilms}
                    onRefresh={this.fetchFilms}
                    data={this.state.films}
                    renderItem={({item}) => this.renderFilmCard(item)}
                    keyExtractor={(film) => film.id.toString()}
                    ListEmptyComponent={this.listEmptyText}
                />
            </View>
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
    rootContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 72,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default Films;