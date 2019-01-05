import React from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Headline} from "react-native-paper";

class LicensesModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible
        };
    }

    async componentWillReceiveProps(nextProps, nextContext) {
        await this.setState({
            visible: nextProps.visible
        });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}
                onRequestClose={this.props.toggle}>
                <View style={{marginTop: 22}}>
                    <View>
                        <Headline>Open Source Licenses</Headline>

                        <TouchableHighlight
                            onPress={() => {
                                this.props.toggle();
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        marginBottom: 10,
        backgroundColor: '#FFF',
    },
    containerElement: {
        marginLeft: 10,
        marginRight: 10,
    },
    link: {
        color: '#eff472'
    },
});

export default LicensesModal;