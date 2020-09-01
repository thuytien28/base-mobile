/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from './icon';

class CheckBox extends React.PureComponent {
    static propTypes = {
        onPress: PropTypes.func,
        selected: PropTypes.bool,
        size: PropTypes.any,
    };

    render() {
        const {
            onPress,
            selected,
            size,
        } = this.props;

        const checkboxIcon = selected ? (
            <Icon
                type='AntDesign'
                name='checksquare'
                size={20}
            />
        ) : (
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: '#000',
                }}
            />
        );

        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 5,
                }}
                onPress={() => onPress()}
            >
                {checkboxIcon}
            </TouchableOpacity>
        );
    }
}

export default CheckBox;

