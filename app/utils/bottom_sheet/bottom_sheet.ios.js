/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/


import {ActionSheetIOS} from 'react-native';

export default {
    showBottomSheetWithOptions: (options, callback) => {
        return ActionSheetIOS.showActionSheetWithOptions(options, callback);
    },

    showShareBottomSheetWithOptions: (options, failureCallback, successCallback) => {
        return ActionSheetIOS.showShareActionSheetWithOptions(options, failureCallback, successCallback);
    },
};
