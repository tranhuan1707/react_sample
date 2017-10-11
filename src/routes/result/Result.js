/*
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE.txt file in the root directory of this source tree.
*/

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Result.css';
import Link from '../../components/Link';
import history from '../../history';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/result';

import Auth from '../../routes/modules/Auth';
import UCourseItem from './components/UCourseItem.js'

class Result extends React.Component {

    componentDidMount() {
        let token = Auth.getToken();
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let params = {};
        params.token = token;
        params.user_id = userInfo.id;

        this.props.getResult(params);
    }

    render() {
        const { result } = this.props;
        return(
            <div className="main-wrap">
                <div className="courses">
                    <div className="course-ttl">
                        <span className="txt">Your Result</span>
                        <span className="line"></span>
                    </div>
                    <div className="lessons">
                        <div className="lesson">
                            <div className="lesson-tgl no-hover">
                                {result && result.map((item, idx) => {
                                    return(
                                        <UCourseItem
                                        key={item.id+1}
                                        course_itm={item}
                                        idx={idx}
                                        />
                                    )
                                })}
                                {!result &&
                                    <div className="no-hover">
                                        <br />
                                        <br />
                                        <h3 className="t-c">No result to show</h3>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { result } = state.result;
//   console.log(result);
  return {
    result
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getResult: bindActionCreators(actions.getResult, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Result));