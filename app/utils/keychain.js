/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import {setGenericPassword, resetGenericPassword, getGenericPassword} from 'react-native-keychain';

export async function setAppCredentials(currentUserId, token) {
    if (!currentUserId) {
        return;
    }

    const username = `${currentUserId}`;
    const password = `${token}`;

    // Only save to keychain if the url and token are set
    if (token) {
        try {
            await setGenericPassword(username, password);
        } catch (e) {
            console.warn('could not set credentials', e); //eslint-disable-line no-console
        }
    }
}

export async function getAppCredentials() {
    const credentials = await getGenericPassword();
    return credentials;
}

export async function clearAppCredentials() {
    await resetGenericPassword();
}
