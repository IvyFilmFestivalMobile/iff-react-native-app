import React from 'react';
import {Modal, StyleSheet, WebView} from "react-native";
import {IconButton} from "react-native-paper";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    viewContainer: {
        marginBottom: 10,
        backgroundColor: '#FFF',
    },
    containerElement: {
        marginLeft: 10,
        marginRight: 10,
    }
});

const colors = {
    closeIcon: '#000',
};


class PrivacyPolicyModal extends React.PureComponent {

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
            <Modal animationType="slide"
                   transparent={false}
                   visible={this.state.visible}
                   onRequestClose={this.props.toggle}
                   style={styles.modalContainer}>
                <IconButton
                    icon="close"
                    color={colors.closeIcon}
                    size={36}
                    onPress={() => this.props.toggle()}
                />

                <WebView
                    source={{uri: 'https://ivyfilmfestivalmobile.github.io/iff-backend/privacy_policy.html'}}
                />
            </Modal>
        );
    }
}

export default PrivacyPolicyModal;