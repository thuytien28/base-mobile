/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import { Linking, NativeModules } from 'react-native';
import {Provider} from 'react-redux';

import Main from 'app/Main';
import {store} from 'app/store';
import { Client4 } from 'hoa-redux/client';
import { getMe } from 'hoa-redux/actions/user';

import { DefaultServerUrl } from 'assets/config';
import { getAppCredentials } from './utils/keychain';
import NavigationService from 'app/navigation/NavigationService';
import SplashScreen from './splash_screen';

const init = async () => {

    await Linking.getInitialURL().then((url) => {
        if (url) {
            if (url.indexOf('waiting') !== -1) {
                NavigationService.resetToWithParams('SignInWaiting', {
                    url,
                });
            } else if (url.indexOf('reset_password') !== -1) {
                NavigationService.resetToWithParams('ResetPassword', {
                    url,
                });
            }
        }

    });
    const credentials = await getAppCredentials();
    if (credentials) {
        await Client4.setToken(credentials.password);
        store.dispatch(getMe());
        NavigationService.resetTo('AppTabNavigator');
    }
};

class hoaMobile extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        Client4.setUrl(DefaultServerUrl);

        this.state = { isLoading: true };
    }

    async componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL);
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.setState({ isLoading: false }, () => {
                init();
            });
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result');
                },
                2000,
            ),
        );
    }

    handleOpenURL(event) {
        console.log('url: ', event.url);

        if (event.url) {
            if (event.url.indexOf('waiting') !== -1) {
                NavigationService.resetToWithParams('SignInWaiting', {
                    url: event.url,
                });
            } else if (event.url.indexOf('reset_password') !== -1) {
                NavigationService.resetToWithParams('ResetPassword', {
                    url: event.url,
                });
            }
        }
    }

    render() {
        if (this.state.isLoading) {
            return <SplashScreen />;
        }
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

export default hoaMobile;