import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';


class FilmCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    toggleExpand = () => {  
        this.setState({
            expanded: !this.state.expanded
        });
    };

    collapsible = () => {
        if(this.state.expanded) {
            return (
                <View>
                    <Text style={{margin: 8, color: '#000'}}>
                        {this.props.film.description}
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    };

    render() {

        return (
                <Card style = {{margin: 4}} onPress= {this.toggleExpand}>
                    <TouchableOpacity onPress= {this.toggleExpand} style= {styles.cardLayout}>
                        <Card.Cover style={styles.picture} source={{uri: this.props.film.poster_url}}/>
                        <View style={styles.filmInfo}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 5
                            }}>
                                <Text style={styles.filmTitle}>
                                    {this.props.film.title}
                                </Text>
                              
                                    <Text style = {{opacity: 0.5}}>
                                        {' '}{this.props.film.release_date.substring(0, 4)}
                                    </Text>
                             
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                                <Text style= {styles.details}>Released: </Text>
                                <Text style={styles.text}>{this.props.film.time}</Text>
                            </View>

                            <View style={{display: 'flex', flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                                <Text style={styles.details}>Location: </Text>
                                <Text style={styles.text}>{this.props.film.location}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.collapsible()}
                </Card>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        flex: 0.5,
        margin: 8,
    },
    filmInfo: {
        flex: 1,  
        margin: 6,
        display: 'flex',
    },
    cardLayout: {
        display: 'flex',
        flexDirection: 'row',  
    },
    details: {
        color: '#ee5956'
    },

    filmTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },

    text: {
        color: '#000'
    }
});

export default FilmCard;