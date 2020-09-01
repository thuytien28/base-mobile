/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        '@babel/plugin-transform-runtime',
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    assets: './assets',
                },
            },
        ],
    ],
    exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
};
