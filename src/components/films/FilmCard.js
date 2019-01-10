import React from 'react';
import moment from 'moment';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Text, IconButton, Subheading, Title} from 'react-native-paper';


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
    }

    collapsible = () => {
        if(this.state.expanded) {
            return (
                <View>
                    <Text style= {{margin: 8}}>
                        {this.props.synopsis}
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    }

    render() {

        return (
                <Card style = {{margin: 4}} onPress= {this.toggleExpand}>
                    <TouchableOpacity onPress= {this.toggleExpand} style= {styles.cardLayout}>
                        <Card.Cover style={styles.picture} source={{uri: this.props.image_url}}/>
                        <View style={styles.filmInfo}>
                            <View style= {{flexDirection: 'row', justifyContent: 'space-between',  marginBottom: 5}}>
                                <Text>
                                    {this.props.film_name}
                                </Text>
                              
                                    <Text style = {{opacity: 0.5}}>
                                        {' '}{this.props.release_date.substring(0,4)}
                                    </Text>
                             
                            </View>
                            <View style= {{flexDirection: 'row'}}>
                                <Text style= {styles.details}>Released: </Text>
                                <Text>{this.props.release_date}</Text>
                            </View>
                            <View style= {{flexDirection: 'row'}}>
                                <Text style= {styles.details}>Runtime: </Text>
                                <Text>{this.props.runtime}</Text>
                            </View>
                            <View style= {{flexDirection: 'row'}}>
                                <Text style= {styles.details}>Genre(s): </Text>
                                <Text>{this.props.genres}</Text>
                            </View>
                            <View>
                                <Text style= {{opacity: 0.5, marginTop: 3}}>{this.props.tagline}</Text>
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
        height: 150,
        width: 120,
        margin: 8,
    },
    filmInfo: {
        flex: 1,  
        margin: 6,
    },
    cardLayout: {
        flexDirection: 'row',  
    },
    details: {
        color: '#ff0000'
    }

});

export default FilmCard;