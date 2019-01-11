import React from 'react';
import {View} from 'react-native';
import EventFilterEnum from "./EventFilterEnum";
import {Button, Dialog, Paragraph, Portal, RadioButton, TouchableRipple} from "react-native-paper";
import {setEventFilter} from "../../redux/actions";
import {connect} from "react-redux";

class ScheduleFilterDialog extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            filter: this.props.eventFilter
        };

        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.dismissDialog = this.dismissDialog.bind(this);
        this.submitFilterChange = this.submitFilterChange.bind(this);
    }

    showDialog = () => this.setState({
        visible: true
    });

    hideDialog = () => this.setState({
        visible: false,
    });

    dismissDialog() {
        this.setState({
            filter: this.props.eventFilter,
            visible: false,
        });
    }

    submitFilterChange() {
        this.hideDialog();
        this.props.setEventFilter(this.state.filter);
        //TODO: Consider removing filter from state as it's redundant with store
    }

    render() {
        return (
            <Portal>
                <Dialog
                    visible={this.state.visible}
                    onDismiss={this.dismissDialog}>
                    <Dialog.Title>Choose Event Filter</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={value => this.setState({filter: value})}
                            value={this.state.filter}
                        >
                            <TouchableRipple onPress={() => this.setState({filter: EventFilterEnum.ALL})}>
                                <View style={styles.row}>
                                    <Paragraph>All</Paragraph>
                                    <RadioButton value={EventFilterEnum.ALL}/>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setState({filter: EventFilterEnum.UPCOMING})}>
                                <View style={styles.row}>
                                    <Paragraph>Upcoming</Paragraph>
                                    <RadioButton value={EventFilterEnum.UPCOMING}/>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.setState({filter: EventFilterEnum.SAVED})}>
                                <View style={styles.row}>
                                    <Paragraph>Saved</Paragraph>
                                    <RadioButton value={EventFilterEnum.SAVED}/>
                                </View>
                            </TouchableRipple>
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={this.submitFilterChange} color={colors.submit_button}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}

const colors = {
    submit_button: '#ee5956'
};

const styles = {
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
};

const mapStateToProps = state => {
    return {eventFilter: state.eventFilter};
};

export default connect(mapStateToProps, {setEventFilter}, null, {forwardRef: true})(ScheduleFilterDialog);