
/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import {createAppContainer} from 'react-navigation';

import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import AppMain from 'app/navigation/app_main';

export default createAppContainer(
    createAnimatedSwitchNavigator(
        {
            AppMain,
        },
        {
            initialRouteName: 'AppMain',
        },

    ),
);
