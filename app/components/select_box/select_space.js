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
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import Modal from 'react-native-modal';
import { objectToArray } from '../../utils/convert_data';
import Loading from '../loading';

class SelectSpace extends React.PureComponent {
    static propTypes = {
        value: PropTypes.any,
        onPressItem: PropTypes.any,
        spaces: PropTypes.any,
        actions: PropTypes.any,
        type: PropTypes.any,
        totalPages: PropTypes.any,
        getSpaces: PropTypes.any,
    };

    state = {
        isVisible: false,
        page: 1,
        isEnd: false,
        loading: false,
    }

    componentDidMount() {
        const { actions, type } = this.props;
        actions.getAllSpaces(1, 10, type, '');
    }

    componentDidUpdate(prevProps) {
        const { getSpaces } = this.props;
        if (JSON.stringify(getSpaces) !== JSON.stringify(prevProps.getSpaces)) {
            const { status } = getSpaces;
            if (status === 'started') {
                this.setState({
                    loading: true,
                });
            } else {
                this.setState({
                    loading: false,
                });
            }
        }
    }


    setModalVisible = (value) => {
        this.setState({
            isVisible: value,
        });
    }

    onEndReached = () => {
        const { totalPages, actions, type } = this.props;

        if (this.state.isEnd) {
            return null;
        }

        if (!this.onEndReachedCalledDuringMomentum) {
            let page = this.state.page;
            let isEnd = false;
            page++;
            if (page === totalPages) {
                isEnd = true;
            }
            this.setState({
                page,
                isEnd,
            }, () => {
                actions.getAllSpaces(page, 10, type, '');
            });

            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    renderFooter = () => {
        const {loading, isEnd} = this.state;
        if (!isEnd && loading) {
            return (
                <View style={{height: 100}}>
                    <Loading
                        styleCtn={{backgroundColor: '#fff',}}
                    />
                </View>
            );
        }
        return null;
    }

    renderItem = ({item}) => {
        const { onPressItem } = this.props;
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.itemCtn}
                onPress={() => {
                    onPressItem(item);
                    this.setModalVisible(false);
                }}
            >
                <Text style={styles.item}> {item.name} </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { value, spaces } = this.props;
        const { isVisible } = this.state;
        const options = objectToArray(spaces);

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View>
                        <Text style={styles.title}> {'Select space'} </Text>
                        <Text style={styles.value}> {value ? value.name : ''} </Text>
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
                        <Text style={styles.titleModal}>{'Select space'}</Text>
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponent={this.renderFooter}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={false}
                            style={{flexGrow: 0, paddingHorizontal: 22}}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={1}
                            onMomentumScrollBegin={() => {
                                this.onEndReachedCalledDuringMomentum = false;
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

export default SelectSpace;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    box: {
        width: '100%',
        height: 60,
        backgroundColor: '#E4E4E4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 4,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 11,
        marginTop: 5,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        height: '50%',
    },
    titleModal: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 17
    },
    itemCtn: {
        height: 30,
        marginLeft: 5,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        marginTop: 10,
    },
});
