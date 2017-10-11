/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/** MinhNguyenWP Team
 * created on : 05.2017
  */
/* global $, jQuery */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Course.css';
import Link from '../../Link';

import Auth from '../../../routes/modules/Auth';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/level';

// 1. jQ: Slide Header nav
function slideHeaderNav(_this) {
    $('.h-nav-slide').slick({
        infinite: false,
        rows: 1,
        slidesToShow: 7,
        slidesToScroll: 1,
        prevArrow: '<a href="javascript:;" class="slick-prev slick-arrow"><i class="fa fa-angle-left"></i></a>',
        nextArrow: '<a href="javascript:;" class="slick-next slick-arrow"><i class="fa fa-angle-right"></i></a>'
    });
}

class Course extends React.Component {
  state = {
    userCode : null
  }
  componentDidMount() {
    // get level
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let token = Auth.getToken();

    let params = {};
    params.token = token;
    params.course_id = userInfo.course_id;
    params.user_id = userInfo.id;

    // setState userCode
    this.setState({userCode: this.props.lesson_level ? this.props.lesson_level : userInfo.level});

    this.props.getLevel(params);
  }

  componentWillReceiveProps(nextProps) {
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

    if(nextProps.lesson_level !== this.props.lesson_level) {
      this.setState({userCode: nextProps.lesson_level ? nextProps.lesson_level : userInfo.level});
    }
  }

  render() {
    const {level} = this.props;
    const {userCode} = this.state;

    return (
        <div className="header-nav"
          ref="courseTab"
          >
            <ul className="h-nav-slide" >
              {level && level.map((item, idx) => {
                return(
                  <li key={idx+1}
                  className={(item.active === 0) ? 'blocked' : ''}>
                    <Link 
                    className={(userCode !== null && userCode === item.code) ? 'active' : ''}
                    to={"/lessons/" + item.code}>
                      <span>
                        {item.name}
                        {item.active === 0 && <i className="fa fa-lock"></i>}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
        </div>
    );
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { level } = state.level;
  
  return {
    level
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getLevel: bindActionCreators(actions.getLevel, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Course));