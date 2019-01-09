import React from 'react';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import {Paragraph, Switch} from "react-native-paper";
import {toggleEasternTime} from "../../redux/actions";
import {connect} from 'react-redux';

const styles = {
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        marginRight: 10,
        marginLeft: 10, //TODO: might need consistent marginTop with other tabs
    },
};

class Settings extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'Settings',
    });

    render() {
        return (
            <ScrollView>
                <TouchableWithoutFeedback onPress={this.props.toggleEasternTime}>
                    <View style={styles.row}>
                        <Paragraph>Events in Eastern Time Zone (ET)</Paragraph>
                        <Switch value={this.props.isEasternTime} onValueChange={this.props.toggleEasternTime}/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {isEasternTime: state.isEasternTime}; //TODO: note performance drop
};

export default connect(
    mapStateToProps,
    {toggleEasternTime}
)(Settings);