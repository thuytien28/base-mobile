/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import Icon from 'app/components/icon';

import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import BottomSheet from 'app/utils/bottom_sheet';

const PermissionTypes = {
    UNDETERMINED: 'undetermined',
    AUTHORIZED: 'authorized',
    DENIED: 'denied',
};

export default class AttachmentButton extends PureComponent {
    static propTypes = {
        validMimeTypes: PropTypes.array,
        canTakePhoto: PropTypes.bool,
        fileCount: PropTypes.number,
        canPhotoLibrary: PropTypes.bool,

        // maxFileCount: PropTypes.number.isRequired,
        // maxFileSize: PropTypes.number.isRequired,
        onShowFileMaxWarning: PropTypes.func,
        onShowFileSizeWarning: PropTypes.func,
        onShowUnsupportedMimeTypeWarning: PropTypes.func,
        uploadFiles: PropTypes.func.isRequired,
        extraOptions: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        browseFileTypes: Platform.OS === 'ios' ? 'public.item' : '*/*',
        validMimeTypes: [],
        canTakePhoto: true,
        canPhotoLibrary: true,
        maxFileCount: 5,
        extraOptions: null,
        isMultiSelect: true,
    };

    attachPhotoFromCamera = () => {
        return this.attachFileFromCamera('photo', 'camera');
    };

    attachFileFromCamera = async (mediaType, source) => {
        const options = {
            quality: 0.8,
            videoQuality: 'high',
            noData: true,
            mediaType,
            storageOptions: {
                cameraRoll: true,
                waitUntilSaved: true,
            },
            permissionDenied: {
                title: 'Camera access is required',
                text: 'To take photos and videos with your camera, please change your permission settings.',
                reTryTitle: 'Set Permission',
                okTitle: 'Dismiss',
            },
        };

        const hasPhotoPermission = await this.hasPhotoPermission(source);

        if (hasPhotoPermission) {
            ImagePicker.launchCamera(options, (response) => {
                if (response.error || response.didCancel) {
                    return;
                }
                this.uploadFiles([response]);
            });
        }

    };

    attachFileFromLibrary = () => {
        const options = {
            quality: 0.8,
            noData: true,
            permissionDenied: {
                title: 'Photo library access is required',
                text: 'To upload images from your library, please change your permission settings.',
                reTryTitle: 'Set Permission',
                okTitle: 'Dismiss',
            },
        };

        if (Platform.OS === 'ios') {
            options.mediaType = 'mixed';
        }

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }

            // console.log("response", response);
            this.uploadFiles([response]);
        });

    };

    hasPhotoPermission = async (source) => {
        if (Platform.OS === 'ios') {
            let permissionRequest;
            const targetSource = source || 'photo';
            const hasPermissionToStorage = await Permissions.check(targetSource);

            switch (hasPermissionToStorage) {
            case PermissionTypes.UNDETERMINED:
                permissionRequest = await Permissions.request(targetSource);
                if (permissionRequest !== PermissionTypes.AUTHORIZED) {
                    return false;
                }
                break;
            case PermissionTypes.DENIED: {
                const canOpenSettings = await Permissions.canOpenSettings();
                let grantOption = null;
                if (canOpenSettings) {
                    grantOption = {
                        text: 'Set permission',
                        onPress: () => Permissions.openSettings(),
                    };
                }

                Alert.alert(
                    'Photo library access is required',
                    'To upload images from your library, please change your permission settings.',
                    [
                        grantOption,
                        {
                            text: 'Dismiss',
                        },
                    ],
                );
                return false;
            }
            }
        }

        return true;
    };

    hasStoragePermission = async () => {
        if (Platform.OS === 'android') {
            let permissionRequest;
            const hasPermissionToStorage = await Permissions.check('storage');

            switch (hasPermissionToStorage) {
            case PermissionTypes.UNDETERMINED:
                permissionRequest = await Permissions.request('storage');
                if (permissionRequest !== PermissionTypes.AUTHORIZED) {
                    return false;
                }
                break;
            case PermissionTypes.DENIED: {
                const canOpenSettings = await Permissions.canOpenSettings();
                let grantOption = null;
                if (canOpenSettings) {
                    grantOption = {
                        text: 'Set permission',
                        onPress: () => Permissions.openSettings(),
                    };
                }

                Alert.alert(
                    'File Storage access is required',
                    'To upload images from your Android device, please change your permission settings.',
                    [
                        {
                            text: 'Dismiss',
                        },
                        grantOption,
                    ],
                );
                return false;
            }
            }
        }

        return true;
    };

    uploadFiles = async (files) => {
        const file = files[0];
        if (!file.fileSize | !file.fileName) {
            const path = (file.path || file.uri).replace('file://', '');
            const fileInfo = await RNFetchBlob.fs.stat(path);
            file.fileSize = fileInfo.size;
            file.fileName = fileInfo.filename;
        }

        // if (!file.type) {
        //     file.type = lookupMimeType(file.fileName);
        // }

        const {validMimeTypes} = this.props;
        if (validMimeTypes.length && !validMimeTypes.includes(file.type)) {
            this.props.onShowUnsupportedMimeTypeWarning();
        } else if (file.fileSize > this.props.maxFileSize) {
            this.props.onShowFileSizeWarning(file.fileName);
        } else {
            this.props.uploadFiles(files);
        }
    };

    handleFileAttachmentOption = (action) => {
        // Have to wait to launch the library attachment action.
        // If we call the action after dismissModal with no delay then the
        // Wix navigator will dismiss the library attachment modal as well.
        setTimeout(() => {
            if (typeof action === 'function') {
                action();
            }
        }, 100);
    };

    showFileAttachmentOptions = () => {
        const items = [
            {
                action: () =>
                    this.handleFileAttachmentOption(this.attachPhotoFromCamera),
                text: 'Take Photo',
                icon: 'camera',
            },
            {
                action: () =>
                    this.handleFileAttachmentOption(this.attachFileFromLibrary),
                text: 'Photo Library',
                icon: 'photo',
            },
        ];

        const sheetItems = items.map((item) => {
            return item.text;
        });

        const cancelText = 'Cancel';
        BottomSheet.showBottomSheetWithOptions(
            {
                options: [...sheetItems, cancelText],
                cancelButtonIndex: sheetItems.length,
            },
            (buttonIndex) => {
                if (buttonIndex === undefined) {
                    return null;
                }

                if (buttonIndex !== sheetItems.length) {
                    items[buttonIndex].action();
                }
            },
        );
    };

    render() {

        return (
            <TouchableOpacity
                style={styles.iconCtn}
                onPress={this.showFileAttachmentOptions}
            >
                <Icon
                    type='Feather'
                    name={'camera'}
                    size={15}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    attachIcon: {
        marginTop: Platform.select({
            ios: 2,
            android: 0,
        }),
    },
    buttonContainer: {
        height: Platform.select({
            ios: 34,
            android: 36,
        }),
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#C8C8C8',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50,
    },
});
