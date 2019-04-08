import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Paragraph, Subheading} from "react-native-paper";
import FullWidthImage from 'react-native-fullwidth-image';

const colors = {
    text: '#FFF',
};

const styles = StyleSheet.create({
    imageViewContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
    },
    fullWidthImage: {
        opacity: .8,
        backgroundColor: 'transparent',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 24,
        color: colors.text,
    },
    textParagraph: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    subheading: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold',
    }
});

class Festival extends React.PureComponent {

    static navigationOptions = {
        tabBarLabel: 'Festival',
    };

    render() {
        return (
            <ScrollView>
                <Subheading style={styles.subheading}>Event Types</Subheading>

                <View style={styles.imageViewContainer}>
                    <FullWidthImage
                        source={{uri: 'https://ivyfilmfestivalmobile.github.io/iff-backend/assets/mobile/img/screenings.jpeg'}}
                        width={1920} height={1080} style={styles.fullWidthImage}/>

                    <Text style={styles.textOverlay}>
                        Screenings
                    </Text>
                </View>
                <Paragraph style={styles.textParagraph}>
                    At the heart of Ivy Film Festival are the short film and screenplay official selections coming from
                    various countries and universities across the globe. Access early showings of upcoming films and
                    student submissions in Animation, Comedy, Drama, and much more.
                </Paragraph>

                <View style={styles.imageViewContainer}>
                    <FullWidthImage
                        source={{uri: 'https://ivyfilmfestivalmobile.github.io/iff-backend/assets/mobile/img/speakers.jpeg'}}
                        width={1920} height={1080} style={styles.fullWidthImage}/>

                    <Text style={styles.textOverlay}>
                        Speakers
                    </Text>
                </View>
                <Paragraph style={styles.textParagraph}>
                    Listen as renowned professionals share stories of their careers and give tips on filmmaking. You'll
                    have the opportunity to ask questions and gain insight their journeys.
                </Paragraph>

                <View style={styles.imageViewContainer}>
                    <FullWidthImage
                        source={{uri: 'https://ivyfilmfestivalmobile.github.io/iff-backend/assets/mobile/img/workshops.jpg'}}
                        width={1920} height={1280} style={styles.fullWidthImage}/>

                    <Text style={styles.textOverlay}>
                        Workshops
                    </Text>
                </View>
                <Paragraph style={styles.textParagraph}>
                    Love filmmaking but afraid you can't compete with film school grads or lack skill, Workshops
                    allow you to get hands-on experience creating various forms of content with no previous experience
                    necessary!
                </Paragraph>

                <View style={styles.imageViewContainer}>
                    <FullWidthImage
                        source={{uri: 'https://ivyfilmfestivalmobile.github.io/iff-backend/assets/mobile/img/vr-arcade.jpeg'}}
                        width={1920} height={1525} style={styles.fullWidthImage}/>

                    <Text style={styles.textOverlay}>
                        VR Arcade
                    </Text>
                </View>
                <Paragraph style={styles.textParagraph}>
                    VR Arcade is a collection of groundbreaking new media by students from around the globe.
                    Ranging from 360° videos to interactive experiences, from sound installations to projected cave
                    work, the exhibition offers immersive storytelling media in many nascent forms. Please reserve
                    for slots ahead of time.
                </Paragraph>
            </ScrollView>
        );
    }
}

export default Festival;