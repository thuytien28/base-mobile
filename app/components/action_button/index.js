/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import Icon from '../icon';

export default class ActionButton extends React.PureComponent {
    static propTypes = {
        btnContainer: PropTypes.object,
        onPress: PropTypes.func.isRequired,
        iconSize: PropTypes.number,
        iconColor: PropTypes.string,
        iconName: PropTypes.string.isRequired,
        isFloat: PropTypes.bool,
    };

    static defaultProps = {
        iconSize: 24,
        iconColor: '#fff',
        isFloat: true,
    };
    render() {
        const {
            btnContainer,
            onPress,
            iconName,
            isFloat,
            iconType,
        } = this.props;

        let container;

        if (isFloat) {
            container = {
                position: 'absolute',
                right: 20,
                bottom: 20,
            };
        }

        return (
            <TouchableOpacity
                style={[styles.container, container, btnContainer]}
                onPress={() => onPress()}
            >
                <Icon
                    type={iconType}
                    name={iconName}
                    color='#fff'
                    size={18}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 51,
        width: 51,
        borderRadius: 26,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 2,
            height: 2,
        },

        // shadowOpacity: theme.SHADOW_OPACITY_MEDIUM,
        // shadowRadius: theme.SHADOW_RADIUS_MEDIUM,
        elevation: 1,
    },
});
