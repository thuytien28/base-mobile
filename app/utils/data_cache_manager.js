/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import { Client4 } from 'hoa-redux/client';

const cacheUserImage = new Map();

export const getProfileImage = async (userId) => {
    const userImage = cacheUserImage.get(userId);
    if (userImage) {
        return userImage;
    }
    const image = await Client4.getProfileImage(userId);
    cacheUserImage.set(userId, image);
    return image;
};

const cacheUser = new Map();

export const getUser = async (userId) => {
    const user = cacheUser.get(userId);
    if (user) {
        return user;
    }
    const userInfo = await Client4.getUser(userId);
    const userImage = await Client4.getProfileImage(userId);
    const newUser = { ...userInfo, user_image: userImage };
    cacheUser.set(userId, newUser);
    return newUser;

};