/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'app/components/icon';

class SplashScreen extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Icon
                        type='Feather'
                        name={'calendar'}
                        size={80}
                        color={'#fff'}
                    />
                    <View>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                            {'MEETING ROOM'}
                        </Text>
                        <Text style={{fontSize: 31, color: '#fff', fontWeight: 'bold'}}>
                            {'BOOKING'}
                        </Text>
                    </View>
                </View>
                <Text style={{fontSize: 13, color: '#989898', textAlign: 'center', marginBottom: 20}}>
                    {'A PRODUCT OF'}
                    <Text style={{color: '#fff'}}> {'HOGAR'} </Text>
                </Text>
            </View>
        );
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'space-between',
    },
    top: {
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});