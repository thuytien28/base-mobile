/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    ViewPropTypes,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default class ModalCalendar extends PureComponent {
    static propTypes = {
        onDayPress: PropTypes.any,
        isVisible: PropTypes.any,
        date: PropTypes.any,
        setVisibleDate: PropTypes.any,
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selected: moment(new Date(props.date)).format('YYYY-MM-DD'),
    //     };
    // }

    // componentDidUpdate(prevProps) {
    //     const {date} = this.props;
    //     if (date !== prevProps.date) {
    //         this.state = {
    //             selected: moment(new Date(date)).format('YYYY-MM-DD'),
    //         };
    //     }
    // }

    render() {
        // const { selected } = this.state;
        const {isVisible, setVisibleDate, date} = this.props;
        const day = moment.utc(new Date(date)).format('YYYY-MM-DD');
        const markedDates = {};
        markedDates[day] = {selected: true, selectedColor: '#40B7FF'};

        return (
            <Modal
                isVisible={isVisible}
            >
                <Calendar
                    onDayPress={(day) => {
                        this.props.onDayPress(day.dateString);
                        setVisibleDate(false);

                        // this.setState({
                        //     day: day.dateString,
                        // });
                    }}

                    // onDayLongPress={(day) => {
                    //     this.setState({
                    //         day: day.dateString,
                    //     });
                    // }}
                    markedDates={markedDates}
                    theme={{
                        calendarBackground: '#000',
                        dayTextColor: '#fff',
                        textDisabledColor: '#989898',
                        monthTextColor: '#fff',
                    }}
                />
                {/* <View
                    style={{
                        backgroundColor: '#000',
                        borderTopColor: '#989898',
                        borderTopWidth: 1,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setVisibleDate(false)}
                    >
                        <Text style={{color: '#fff'}}>
                            {'Cancel'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisibleDate(false);
                            this.props.onDayPress(selected);
                        }}
                    >
                        <Text style={{color: '#fff'}}>
                            {'Ok'}
                        </Text>
                    </TouchableOpacity>
                </View> */}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5ef',
    },
});
