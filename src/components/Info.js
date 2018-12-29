import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar} from "react-native-paper";

class Info extends React.Component {
    static navigationOptions = ({navigation}) => {
        return ({
            header: (
                <Appbar.Header style={styles.header}>
                    <Appbar.Content title={'Info'} color={colors.header_color}/>
                    <Appbar.Action icon={'settings'} onPress={() => navigation.state.params.openFilterDialog()}
                                   color={colors.header_color}/>
                </Appbar.Header>),
        });
    };

    render() {
        return (
            <View>
            </View>
        );
    }
}

const colors = {
    header_background_color: '#ee5956',
    header_color: '#ffffff',
    spinner_color: '#0e3737',
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.header_background_color,
    },
    content: {
        padding: 4,
    },
    scrollContainer: {
        flexGrow: 1
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

export default Info;