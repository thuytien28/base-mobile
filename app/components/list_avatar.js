/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import Avatar from './avatar';

class ListAvatar extends React.PureComponent {
    static propTypes = {
        users: PropTypes.any,
    };

    renderItem = ({item, index}) => {
        const { users } = this.props;
        return (
            <View>
                {
                    index === 0 &&
                    <Avatar
                        userId={item.id}
                        size={25}
                    />
                }
                {
                    index !== 0 && index < 3 &&
                    <Avatar
                        userId={item.id}
                        size={25}

                        // style={{ position: 'relative', marginLeft: -5 }}
                    />
                }
                {
                    index > 3 &&
                    <View
                        style={{
                            width: 25,
                            height: 25,
                            borderRadius: 12.5,
                            backgroundColor: '#000',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{color: '#fff', fontSize: 10}}>
                            {'+'}
                            {users.length - 3}
                        </Text>

                    </View>
                }
            </View>
        );
    }

    render() {
        const { users } = this.props;
        if (!users) {
            return null;
        }
        return (
            <FlatList
                data={users.slice(0, 5)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
                horizontal={true}
            />
        );
    }
}

export default ListAvatar;

