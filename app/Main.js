/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import { Platform } from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import {PersistGate} from 'redux-persist/integration/react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    storageFcmToken,
    getNotifications,
} from 'hoa-redux/actions/notification';
import AppNavigator from 'app/navigation';
import NavigationService from 'app/navigation/NavigationService';
import {persistor} from 'app/store';
import Loading from './components/loading_holder';
import LoadingHolder from 'app/utils/loading_holder';
// import messaging from '@react-native-firebase/messaging';
import Device from 'app/utils/device';
import DeviceInfo from 'react-native-device-info';
// import {requestNotifications, RESULTS} from 'react-native-permissions';
import NotifService from 'app/NotifService';
class Main extends React.PureComponent {
    // async componentDidMount() {
    //     this.requestNotificationPermission();

    //     // Orientation.lockToPortrait();
    // }

    // requestNotificationPermission = async () => {
    //     try {
    //         if (Device.os === 'android') {
    //             await messaging().registerDeviceForRemoteMessages();
    //             const fcmToken = await messaging().getToken();

    //             // console.log('fcmToken', fcmToken);
    //             if (fcmToken) {
    //                 this.props.actions.storageFcmToken(fcmToken);
    //             }
    //         } else {
    //             const isIOSSimulator = await DeviceInfo.isEmulator();
    //             if (!isIOSSimulator) {
    //                 const {status} = await requestNotifications(['alert', 'sound']);
    //                 if (status === RESULTS.GRANTED) {
    //                     await messaging().registerDeviceForRemoteMessages();
    //                     const fcmToken = await messaging().getToken();

    //                     // console.log('fcmToken', fcmToken);
    //                     if (fcmToken) {
    //                         this.props.actions.storageFcmToken(fcmToken);
    //                     }
    //                 }
    //             }
    //         }

    //         this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // }

    onRegister = (token) => {
        // console.log(token);
    }

    // onNotif = async (notif) => {
    //     const dataNotif = Platform.OS === 'ios' ? notif.data : notif;
    //     await getNotifications(1, 10);
    //     if (dataNotif.userInteraction) {
    //         const { data } = dataNotif;
    //         NavigationService.resetToWithParams('MeetingDetail', {
    //             meetingId: parseInt(data.meeting_id),
    //         });
    //     }
    // }

    render() {
        const prefix = 'hoa://';

        return (
            <AppearanceProvider>
                <PersistGate
                    persistor={persistor}
                >

                    <AppNavigator
                        uriPrefix={prefix}
                        ref={(navigatorRef) => {
                            NavigationService.setTopLevelNavigator(
                                navigatorRef,
                            );
                        }}
                    />
                    <Loading
                        refs={(ref) => {
                            LoadingHolder.setLoading(ref);
                        }}
                    />
                </PersistGate>
            </AppearanceProvider>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                storageFcmToken,
            },
            dispatch,
        ),
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(Main);
