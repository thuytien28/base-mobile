/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/


import DeviceInfo from 'react-native-device-info';
import RNFetchBlobFS from 'rn-fetch-blob/fs';

const deviceTypes = {
    CONNECTION_CHANGED: 'CONNECTION_CHANGED',
    DEVICE_DIMENSIONS_CHANGED: 'DEVICE_DIMENSIONS_CHANGED',
    DEVICE_TYPE_CHANGED: 'DEVICE_TYPE_CHANGED',
    DEVICE_ORIENTATION_CHANGED: 'DEVICE_ORIENTATION_CHANGED',
    STATUSBAR_HEIGHT_CHANGED: 'STATUSBAR_HEIGHT_CHANGED',
};

export default {
    ...deviceTypes,
    DOCUMENTS_PATH: `${RNFetchBlobFS.dirs.CacheDir}/Documents`,
    IMAGES_PATH: `${RNFetchBlobFS.dirs.CacheDir}/Images`,
    IS_IPHONE_X: DeviceInfo.getModel().includes('iPhone X') || DeviceInfo.getModel().includes('iPhone 11'),
    VIDEOS_PATH: `${RNFetchBlobFS.dirs.CacheDir}/Videos`,
};
