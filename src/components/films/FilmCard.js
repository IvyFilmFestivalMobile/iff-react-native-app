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
                    <Text style= {{margin: 5}}>
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
                <Card style = {{margin: 5}} onPress= {this.toggleExpand}>
                    <TouchableOpacity onPress= {this.toggleExpand} style= {styles.cardLayout}>
                        <Card.Cover style={styles.picture} source={{uri: this.props.image_url}}/>
                        <View style={styles.filmInfo}>
                            <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                        </View>
                    </TouchableOpacity>
                    {this.collapsible()}
                </Card>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        height: 100,
        width: 100,
        margin: 6,
    },
    filmInfo: {
        flex: 1,  
    },
    cardLayout: {
        flexDirection: 'row',  
    },
    details: {
        color: '#ff0000'
    }

});

export default FilmCard;