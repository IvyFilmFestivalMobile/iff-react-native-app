import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image'
import LicensesModal from './LicensesModal';

const styles = StyleSheet.create({
    viewContainer: {
        marginBottom: 10,
    },
    containerElement: {
        marginLeft: 10,
        marginRight: 10,
    },
    link: {
        color: '#ee5956',
        backgroundColor: '#FFF',
        fontWeight: 'bold'
    },
});

class About extends React.PureComponent {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'About',
    });

    constructor(props) {
        super(props);

        this.state = {
            licensesModalVisible: false
        };

        this.toggleLicensesModal = this.toggleLicensesModal.bind(this);
    }

    toggleLicensesModal() {
        this.setState(currState => {
            return ({
                licensesModalVisible: !currState.licensesModalVisible
            });
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.viewContainer}>

                <FullWidthImage
                    source={{uri: 'https://raw.githubusercontent.com/ivyfilmfestival/ivyfilmfestival.github.io/master/assets/2018-cover.jpg'}}
                    style={styles.bannerImage} width={1920} height={978}/>

                <View style={styles.containerElement}>
                    <Text style={styles.link}>Privacy Policy</Text>
                    <TouchableHighlight onPress={this.toggleLicensesModal}>
                        <Text style={styles.link}>Open Source Licenses</Text>
                    </TouchableHighlight>
                </View>

                <LicensesModal visible={this.state.licensesModalVisible} toggle={this.toggleLicensesModal}/>
            </ScrollView>
        );
    }
}

export default About;