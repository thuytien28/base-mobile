/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React, {PureComponent} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    ViewPropTypes,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends PureComponent {
    static propTypes = {
        size: PropTypes.string,
        color: PropTypes.string,
        style: ViewPropTypes.style,
        textStyle: ViewPropTypes.style,
        styleCtn: PropTypes.any,
    };

    static defaultProps = {
        size: 'large',
        color: '#6a6a6a',
        style: {},
        textStyle: {},
    };

    render() {
        const {style, textStyle, styleCtn} = this.props;
        return (
            <View style={[styles.container, styleCtn]}>
                <ActivityIndicator
                    style={[styles.loading, style]}
                    animating={true}
                    size={this.props.size}
                    color={this.props.color}
                />
                <Text style={[styles.text, textStyle]}>
                    {'loading...'}
                </Text>
            </View>
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

    loading: {
        marginLeft: 3,
    },

    text: {
        color: '#6a6a6a',
    },
});
