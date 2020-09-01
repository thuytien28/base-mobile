/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import React from 'react';
import {
    View,
    ActivityIndicator,
    Image,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {getProfileImage} from 'app/utils/data_cache_manager';

class Avatar extends React.PureComponent {
    static propTypes = {
        userId: PropTypes.any,
        size: PropTypes.any,
        style: PropTypes.object,
    };

    state = {
        loading: false,
        base64: '',
        image: '',
    }

    componentDidMount() {
        this.getAvatar();
    }

    componentDidUpdate(prevProps) {
        const { userId, image } = this.props;
        if (userId !== prevProps.userId) {
            this.getAvatar();
        }
        if (image !== prevProps.image) {
            this.setState({
                image,
            });
        }
    }

    getAvatar = async () => {
        const { userId } = this.props;
        if (!userId) {
            return null;
        }
        this.setState({
            loading: true,
        }, async () => {
            const data = await getProfileImage(userId);

            if (data) {
                const fileReaderInstance = new FileReader();
                fileReaderInstance.readAsDataURL(data);
                let base64;
                fileReaderInstance.onload = () => {
                    base64 = fileReaderInstance.result;
                    if (data) {
                        this.setState({
                            loading: false,
                            base64,
                        });
                    } else {
                        this.setState({
                            loading: false,
                        });
                    }
                };
            } else {
                this.setState({
                    loading: false,
                });
            }
        });
    }

    render() {
        const { size, style } = this.props;
        const { base64, loading } = this.state;

        return (
            <View
                style={[style, {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: '#f5f5ef',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}
            >
                {
                    loading ?
                        <ActivityIndicator
                            animating={true}
                            size={size / 2}
                            color={'#707070'}
                        /> :
                        <Image
                            style={{
                                width: this.props.size,
                                height: this.props.size,
                                borderRadius: this.props.size / 2,
                            }}
                            source={{uri: base64}}
                        />
                }
            </View>
        );
    }
}

export default Avatar;

const styles = StyleSheet.create({
});

