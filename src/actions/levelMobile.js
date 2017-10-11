/**
 * LEVEL ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API} from '../helper/constant/Site';
import {
    LEVEL_MB_START,
    LEVEL_MB_SUCCESS,
    LEVEL_MB_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';

// Action Get Level
export function getLevelMobile(params) {

    return async (dispatch, getState) => {
        dispatch({
            type: LEVEL_MB_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlLevel;

            if(params && params.course_id) {
                urlParam  += '?course_id=' + params.course_id;
            }

            if(params && params.user_id) {
                urlParam  += '&user_id=' + params.user_id;
            }
            
            if(params && params.token) {
                urlParam  += '&access_token=' + params.token;
            }

            const request = axios({
                method: 'get',
                url: urlParam,
            }).then(
                async (response) => {
                    if (response) {
                        dispatch({
                            type: LEVEL_MB_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: LEVEL_MB_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: LEVEL_MB_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}