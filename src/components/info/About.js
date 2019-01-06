import React from 'react';
import {Linking, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
import {Paragraph} from "react-native-paper";

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
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
    },
    linkContent: {
        marginBottom: 5,
    },
});

class About extends React.PureComponent {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'About',
    });

    constructor(props) {
        super(props);

        this.state = {
            privacyPolicyModalVisible: false,
            licensesModalVisible: false
        };
    }

    openWebsite() {
        Linking.openURL('https://ivyfilmfestival.org');
    }

    openPrivacyPolicy() {
        Linking.openURL('https://ivyfilmfestivalmobile.github.io/iff-backend/privacy_policy.html');
    }

    openLicenses() {

    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.viewContainer}>

                <FullWidthImage
                    source={{uri: 'https://raw.githubusercontent.com/ivyfilmfestival/ivyfilmfestival.github.io/master/assets/2018-cover.jpg'}}
                    style={styles.bannerImage} width={1920} height={978}/>

                <View style={styles.containerElement}>
                    <Paragraph style={styles.paragraph}>
                        Ivy Film Festival (IFF) is the largest student-run film festival in the world and offers
                        students from domestic and foreign universities a venue to exhibit their work.
                    </Paragraph>

                    <TouchableHighlight onPress={this.openWebsite} style={styles.linkContent}>
                        <Text style={styles.link}>Website</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.openPrivacyPolicy} style={styles.linkContent}>
                        <Text style={styles.link}>Privacy Policy</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.openLicenses} style={styles.linkContent}>
                        <Text style={styles.link}>Open Source Licenses</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

export default About;