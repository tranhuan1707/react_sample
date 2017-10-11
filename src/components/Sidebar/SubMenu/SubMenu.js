/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $ */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SubMenu.css';
import Link from '../../Link';
import history from '../../../history';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/course';

import Auth from '../../../routes/modules/Auth';



class SubMenu extends React.Component {

    componentDidMount() {
        let token = Auth.getToken();
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let params = {};
        params.token = token;
        params.user_id = userInfo.id;

        this.props.getCourse(params);
    }

    render() {
      const { course } = this.props;

      return (
        <ul id="smenu1" className="sub-menu">
            {course && course.data && course.data.items.map(
              (item, i) => {
                return (
                  <li key={i+1}>
                    <Link to='/'>
                      <span className="title">{item.name}</span>
                    </Link>
                  </li>
                )
              }
            )}
        </ul>
      );
    }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { course } = state.course;

  return {
    course
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getCourse: bindActionCreators(actions.getCourse, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(SubMenu));
