/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/


import ActionSheet from 'react-native-action-sheet';
export default {
    showBottomSheetWithOptions: (options, callback) => {
        return ActionSheet.showActionSheetWithOptions(options, callback);
    },

    showShareBottomSheetWithOptions: (options, failureCallback, successCallback) => {
        return ActionSheet.showShareActionSheetWithOptions(options, failureCallback, successCallback);
    },
};
