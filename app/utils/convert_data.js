/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/
export function objectToArray(obj) {
    if (!obj) {
        return [];
    }
    const keys = Object.keys(obj);

    // keys = keys.sort((a, b) => {
    //     const time1 = new Date(obj[a].update_at).getTime();
    //     const time2 = new Date(obj[b].update_at).getTime();
    //     return time2 - time1;
    // });
    return keys.map((key) => {
        return obj[key];
    });
}

export function arrayToObject(array) {
    if (!array) {
        return {};
    }
    const obj = {};
    array.map((a) => {
        obj[a.id] = a;
    });
    return obj;
}