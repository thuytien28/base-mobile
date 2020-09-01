/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import {NavigationActions, StackActions} from 'react-navigation';

class NavigationService {
    constructor() {
        this.navigator = null;
    }
    setTopLevelNavigator(navigatorRef) {
        this.navigator = navigatorRef;
    }

    navigate(routeName, params) {
        this.navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            }),
        );
    }
    replace(routeName, params) {
        this.navigator.dispatch(
            StackActions.replace({
                routeName,
                params,
            }),
        );
    }

    popToTop() {
        this.navigator.dispatch(StackActions.popToTop());
    }

    resetTo(routeName) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName})],
        });
        this.navigator.dispatch(resetAction);
    }

    resetToWithParams(routeName, params) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName, params})],
        });
        this.navigator.dispatch(resetAction);
    }
}

export default new NavigationService();
