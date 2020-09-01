/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';

function Home({navigation}) {
   
    return (
        <View style={styles.container}>
            <Text>
                HOME
            </Text>
        </View>
    );
}

Home.propTypes = {
};

export default Home;

const styles = StyleSheet.create({
})