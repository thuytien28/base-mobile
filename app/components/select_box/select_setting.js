/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import Modal from 'react-native-modal';
import ItemNoti from './item_noti';

class SelectSetting extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.any,
        options: PropTypes.any,
        onPressItem: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            noti: props.value,
        };
    }

    setModalVisible = (value) => {
        this.setState({
            isVisible: value,
        });
    }

    onPressItemNoti = (item) => {
        const { noti } = this.state;
        const tmp = noti;
        if (noti.indexOf(item) === -1) {
            tmp.push(item);
        } else {
            tmp.splice(noti.indexOf(item), 1);
        }
        this.setState({
            noti: tmp,
        });
    }

    render() {
        const { title, value, options, onPressItem } = this.props;
        const { isVisible, noti } = this.state;
        if (title === 'Notifications') {
            let tmp = '';
            value.map((v) => {
                tmp += v + ', ';
            });
            tmp = tmp.substr(0, tmp.length - 2);

            return (
                <View style={styles.container}>
                    <View style={styles.box}>
                        <View>
                            <Text style={styles.title}> {title} </Text>
                            <Text style={styles.value}> {tmp} </Text>
                        </View>
                        <TouchableOpacity
                            style={{padding: 10}}
                            onPress={() => this.setModalVisible(true)}
                        >
                            <Icon
                                type={'AntDesign'}
                                name={'caretdown'}
                                color={'#989898'}
                                size={10}
                            />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        isVisible={isVisible}
                        onBackdropPress={() => this.setModalVisible(false)}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.titleModal}>{'Select ' + title }</Text>
                            {
                                options &&
                                options.map((item) => {
                                    return (
                                        <ItemNoti
                                            key={item}
                                            item={item}
                                            noti={noti}
                                            onPressItemNoti={this.onPressItemNoti}
                                        />
                                    );
                                })
                            }
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                                <TouchableOpacity
                                    style={{
                                        width: 50,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: '#000',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => {
                                        console.log(noti);
                                        onPressItem(noti);
                                        this.setModalVisible(false);
                                    }}
                                >
                                <Text style={{color: '#fff'}}> {'Ok'} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View>
                        <Text style={styles.title}> {title} </Text>
                        {
                            title === 'Default duration' ?
                                <Text style={styles.value}> {value + ' min'} </Text> :
                                <Text style={styles.value}> {value} </Text>
                        }

                    </View>
                    <TouchableOpacity
                        style={{padding: 10}}
                        onPress={() => this.setModalVisible(true)}
                    >
                        <Icon
                            type={'AntDesign'}
                            name={'caretdown'}
                            color={'#989898'}
                            size={10}
                        />
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={isVisible}
                    onBackdropPress={() => this.setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <Text style={styles.titleModal}>{'Select ' + title }</Text>
                        {
                            options &&
                            options.map((item) => {
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.itemCtn}
                                        onPress={() => {
                                            onPressItem(item);
                                            this.setModalVisible(false);
                                        }}
                                    >
                                        {
                                            title === 'Default duration' ?
                                                <Text style={styles.item}> {item + ' min'} </Text> :
                                                <Text style={styles.item}> {item} </Text>
                                        }
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </Modal>
            </View>
        );
    }
}

export default SelectSetting;

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 42,
        backgroundColor: '#E4E4E4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 11,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 4,
    },
    title: {
        fontSize: 9,
        color: '#5D5D5D',
    },
    value: {
        fontSize: 9,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    titleModal: {
        textAlign: 'center',
        marginBottom: 20,
    },
    itemCtn: {
        height: 30,
        marginLeft: 15,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        marginTop: 10,
    },
});
