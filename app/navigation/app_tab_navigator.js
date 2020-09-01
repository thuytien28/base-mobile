/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';

import {Platform} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'app/components/icon';
import TabBarComponent from 'app/components/tabbar_bottom';
import Home from '../screens/home';

const ICON_SIZE_MEDIUM = 24;

const TABS_CUSTOM =
    Platform.OS === 'android' ?
        {
            tabBarComponent: (props) => <TabBarComponent {...props}/>,
            tabBarPosition: 'bottom',
        } :
        {};

const AppTabNavigator = createBottomTabNavigator({
    Meeting: {
        screen: Home,
        navigationOptions: ({}) => {
            return {
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        type='Feather'
                        name='calendar'
                        size={ICON_SIZE_MEDIUM}
                        color={tintColor}
                    />
                ),
                tabBarOnPress: ({navigation, defaultHandler}) => {
                    defaultHandler();
                },
                title: 'Meetings',
            };
        },
    },
    // Space: {
    //     // screen: SpaceNavigator,
    //     navigationOptions: ({}) => {
    //         return {
    //             tabBarIcon: ({tintColor}) => (
    //                 <Icon
    //                     type='Feather'
    //                     name='grid'
    //                     size={ICON_SIZE_MEDIUM}
    //                     color={tintColor}
    //                 />
    //             ),
    //             tabBarOnPress: ({navigation, defaultHandler}) => {
    //                 defaultHandler();
    //             },
    //             title: 'Spaces',
    //         };
    //     },
    // },
    // Notification: {
    //     // screen: Notification,
    //     navigationOptions: ({}) => {
    //         return {
    //             tabBarIcon: ({tintColor}) => (
    //                 <Icon
    //                     type='FontAwesome'
    //                     name={'bell-o'}
    //                     size={ICON_SIZE_MEDIUM}
    //                     color={tintColor}
    //                 />
    //             ),
    //             tabBarOnPress: ({navigation, defaultHandler}) => {
    //                 defaultHandler();
    //             },
    //             title: 'Notifications',
    //         };
    //     },
    // },
    // Setting: {
    //     // screen: Setting,
    //     navigationOptions: ({}) => {
    //         return {
    //             tabBarIcon: ({tintColor}) => (
    //                 <Icon
    //                     type='AntDesign'
    //                     name={'setting'}
    //                     size={ICON_SIZE_MEDIUM}
    //                     color={tintColor}
    //                 />
    //             ),
    //             tabBarOnPress: ({navigation, defaultHandler}) => {
    //                 defaultHandler();
    //             },
    //             title: 'Settings',
    //         };
    //     },
    // },
},
{
    initialRouteName: 'Meeting',
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: '#000',
        inactiveTintColor: 'rgba(36,37,61,0.5)',
        labelStyle: {
            fontSize: 10,
        },
        keyboardHidesTabBar: true,
        style: {
            height: 60,
        },
    },

    ...TABS_CUSTOM,
},
);

export default AppTabNavigator;
