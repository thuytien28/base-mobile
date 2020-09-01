/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../components/icon';

class SelectSetting extends React.PureComponent {
    static propTypes = {
        noti: PropTypes.any,
        item: PropTypes.any,
        onPressItemNoti: PropTypes.any,
    };

    constructor(props) {
        super(props);
        const { noti, item } = props;
         this.state = {
            selected: noti.indexOf(item) !== -1 ? true : false,
        }
    }

    onPressItem = () => {
        const { onPressItemNoti, item } = this.props;
        this.setState({
            selected: !this.state.selected,
        })
        onPressItemNoti(item);
    }

    render() {
        const { item } = this.props;
        const { selected } = this.state;
        return (
            <TouchableOpacity
                key={item}
                style={[styles.itemCtn, {flexDirection: 'row', justifyContent: 'space-between'}]}
                onPress={this.onPressItem}
            >
                <Text style={styles.item}> {item} </Text>
                {
                    selected && 
                    <Icon
                        type={'AntDesign'}
                        name={'check'}
                        size={20}
                    />
                }
            </TouchableOpacity>
        );
       
    }
}

export default SelectSetting;

const styles = StyleSheet.create({
    itemCtn: {
        height: 30,
        marginLeft: 15,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        marginTop: 10,
    },
});
