import React from 'react';
import moment from 'moment';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Text, IconButton, Subheading, Title} from 'react-native-paper';
import Panel from 'react-native-panel';

class FilmCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: true
        };
    }
    render() {

        return (
                <Card>
                    <TouchableOpacity style= {styles.cardLayout}>
                        <Card.Cover style={styles.picture} source={{uri: this.props.image_url}}/>
                        <View style={styles.filmInfo}>
                            <View style= {{flexDirection: 'row'}}>
                                <Text>
                                    {this.props.film_name}
                                </Text>
                                <View style= {{opacity: 0.5}}>
                                    <Text>
                                        {' '}{this.props.release_date.substring(0,4)}
                                    </Text>
                                </View>
                            </View>
                            <Text>Released: {this.props.release_date}</Text>
                        </View>
                    </TouchableOpacity>
                    <Panel header= {''}>
                        <Text>
                            {this.props.synopsis}
                        </Text>
                    </Panel>
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
    }

});

export default FilmCard;