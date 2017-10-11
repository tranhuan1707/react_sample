/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import Link from '../../components/Link';
import history from '../../history';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      apiError: false,
      apiSuccess: false,
      msgErrorText: '',
      validEmail: false,
      validPassword: false,
      lngError: false,
      errLenghText: '',
      loadingApi: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus(event) {
    if(event.target.name == 'lemail') {
      this.setState({
        validEmail: false,
        lngError: false
      });
    }

    if(event.target.name == 'lpass') {
      this.setState({
        validPassword: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      apiError: false,
      apiSuccess: false,
      msgErrorText: '',
      loadingApi: true
    })

    const lemail = this.refs.lemail
    const password = this.refs.password
    var err = false;

    if(lemail.value === '' || lemail.value.trim().length === 0) {
      err = true;
      this.setState({msgErrorText: 'This field is required!', validEmail : true, loadingApi: false});
    }

    if(password.value === '' || password.value.trim().length === 0) {
      err = true;
      this.setState({msgErrorText: 'This field is required!', validPassword : true, loadingApi: false});
    }

    if(lemail.value.length < 6 || lemail.value.length > 30) {
      err = true;
      this.setState({errLenghText: 'Minimum 6 and maximum 30', lngError: true, loadingApi: false});
    }

    if(!err) {
      this.setState({
        msgErrorText: '',
        validEmail: false,
        validPassword: false,
        lngError: false,
        errLenghText: ''
      });
      const params = { lemail: lemail.value.trim(), password: password.value.trim() }

      this.props.postLogin(params);
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.user && nextProps.user !== null) {

      // login succedd
      if(nextProps.user.code == 200) {
        this.setState({
          apiSuccess: true,
          msgErrorText: nextProps.user.message,
          loadingApi: false
        })

        setTimeout(function() {
          history.push('/');
        }, 1000);

        localStorage.setItem('infoProfile', JSON.stringify(nextProps.user.data.profile));

      }

      // login failed
      if(nextProps.user.code == 401) {
        let msgError = '';

        if(nextProps.user.message.password) {
            msgError = nextProps.user.message.password[0];
        }

        if(nextProps.user.message.username) {
            msgError = nextProps.user.message.username[0];
        }

        this.setState({
          apiError: true,
          msgErrorText: msgError,
          loadingApi: false
        })
      }
    }
  }

  componentDidMount() {
    // console.log(localStorage.getItem('user_access'));
  }

  render() {
    const {validEmail, lngError, msgErrorText,
      errLenghText, validPassword, loadingApi,
      apiError, apiSuccess} = this.state;

    return (
      <div className="form login-form t-c">
        <form onSubmit={this.handleSubmit}>
          <div className="form-logo">
            <Link to="/">
              <img src='./images/Logo_LoginPage.jpg' alt="English Town"/>
            </Link>
          </div>

          {apiError == true && <div className="form-group">
            <div className="alert alert-danger">
              {msgErrorText}
            </div>
          </div>}
          {apiSuccess == true && <div className="form-group">
            <div className="alert alert-success">
              {msgErrorText}
            </div>
          </div>}

          <div className="form-group">
              <input type="text"
              name="lemail"
              ref="lemail"
              placeholder="Username"
              className="form-control"
              onFocus={this.onFocus}
              style={(validEmail || lngError) ? {borderBottomColor: '#db0000'} : {}}/>

              {msgErrorText !== ''
              && validEmail
              && <p className={s.errMsg}>
                {msgErrorText}
              </p>}

              {errLenghText !== ''
              && lngError
              && !validEmail
              && <p style={{color: '#db0000', textAlign: 'left', marginBottom: 0}}>
                {errLenghText}
              </p>}
          </div>
          <div className="form-group">
              <input type="password"
              name="lpass"
              ref="password"
              placeholder="Password"
              className="form-control"
              onFocus={this.onFocus}
              style={(validPassword) ? {borderBottomColor: '#db0000'} : {}}/>

              {msgErrorText !== ''
              && validPassword
              && <p className={s.errMsg}>
                {msgErrorText}
              </p>}
          </div>
          <div className="form-forgot t-c"><Link to="/">Forgot password?</Link></div>
          <button
          type="submit"
          style={(loadingApi) ? {pointerEvents: 'none', backgroundColor: 'rgba(233, 126, 3, 0.56)'} : {}}
          className="btn btn-submit">
          {loadingApi && <i style={{marginRight: 10}} className="fa fa-circle-o-notch fa-spin "></i>}
          Sign in
          </button>
        </form>
      </div>
    );
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { user } = state.user;
  return {
    user
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    postLogin: bindActionCreators(actions.postLogin, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Login));
