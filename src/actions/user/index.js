/**
 * LOGOUT ACTION
 * MinhNguyen WP
 * Created on 06.2017
 * --------
 * 1. Action Login
 * 2. Action Logout
 */
import { ENGTOWN_API, CLIENT_ID, CLIENT_SECRET } from '../../helper/constant/Site';
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE} from '../../helper/actionconst/actionTypes';
import queryLogout from './logout.graphql';
import queryLogin from './login.graphql';
import Auth from '../../routes/modules/Auth';
import axios from 'axios';

// 1. Action Login
export function postLogin(params) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: LOGIN_START,
        });

        try {
            var qs = require('qs');
            let urlParam = ENGTOWN_API.urlLogin;
            let objParams = qs.stringify({
                email : params.lemail,
                password: params.password,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            });
            let username = params.lemail,
                password = params.password;

            const request = axios({
                method: 'post',
                url: urlParam,
                data: objParams,
                // withCredentials: false,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).then(
                async (response) => {
                    if (response) {
                        //console.log('usernameLogin', usernameLogin);
                        if(response.data.code == 200) {

                            Auth.authenticateUser(response.data.data.access_token);
                            //let tokenLogin = ;
                            //console.log('tokenLogin', response.data.data.access_token);
                            const { data }  = await client.networkInterface.query({
                                                    query: queryLogin,
                                                    variables: {
                                                        username,
                                                        password: response.data.data.access_token,
                                                    },
                                            });

                            // console.log('data', data);
                        }

                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}

// 2. Action Logout
export function logoutUser() {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({
        type: LOGOUT_START,
        payload: {
          user: null,
        },
      });

      const { data, errors } = await client.networkInterface.query({ query: queryLogout });

      if (errors) {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: {
            errors,
          },
        });

        return false;
      }

      dispatch({
        type: LOGOUT_SUCCESS,
        payload: {
          user: data,
        },
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: {
          errors: [error],
        },
      });

      return false;
    }

    return true;
  };
}
