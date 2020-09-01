/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';

import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import OuterTablet from './app/outer_tablet';

class App extends React.PureComponent {
    render() {
        return (
            <AppearanceProvider>
                <SafeAreaProvider>
                    <OuterTablet/>
                </SafeAreaProvider>
            </AppearanceProvider>
        );
    }
}

export default App;
