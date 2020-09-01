/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SelectSpace from './select_space';
import { getAllSpaces } from 'hoa-redux/actions/space';
import { getSpacesState } from 'hoa-redux/selectors/entities/space';

const mapStateToProps = (state) => {
    return {
        spaces: getSpacesState(state),
        totalPages: state.hoa.entities.space.meta.total_pages,
        getSpaces: state.hoa.requests.space.getAllSpaces,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getAllSpaces,
        }, dispatch),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectSpace);
