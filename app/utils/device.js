
/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import {Platform, Dimensions} from 'react-native';
// import * as RNLocalize from 'react-native-localize';
import DeviceInfo from 'react-native-device-info';

const Device = {
    os: Platform.OS,
    isPad: Platform.isPad,
    // locale: RNLocalize.getLocales()[0].languageCode,
    // timeZone: RNLocalize.getTimeZone(),
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        fontScale: Dimensions.get('window').fontScale,
    },
    // country: RNLocalize.getCountry(),
};

export const getDeviceId = () => {
    const deviceName = DeviceInfo.getModel();
    const deviceId = DeviceInfo.getUniqueId();
    let device = '';
    if (deviceName && deviceId) {
        device = deviceName + ' ' + deviceId;
        device = device.replace(/ /g, '_');
    } else if (deviceId) {
        device = deviceId;
        device = device.replace(/ /g, '_');
    }
    return device;
};

export default Device;
