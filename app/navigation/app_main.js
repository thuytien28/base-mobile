
/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import {createStackNavigator} from 'react-navigation-stack';

import AppTabNavigator from './app_tab_navigator';

const AppMain =
    createStackNavigator(
        {
            AppTabNavigator: {
                screen: AppTabNavigator,
            },
        },
        {
            mode: 'card',
            headerMode: 'none',
            header: null,
        },
    );

export default AppMain;
