/**
 * COURSE ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API} from '../helper/constant/Site';
import {
    COURSE_START,
    COURSE_SUCCESS,
    COURSE_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';

// Action Get Course
export function getCourse(params) {

    return async (dispatch, getState) => {
        dispatch({
            type: COURSE_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlCourse;

            if(params && params.token) {
                urlParam  += '?access_token=' + params.token;
            }
            if(params && params.user_id) {
                urlParam  += '&user_id=' + params.user_id;
            }
            
            

            const request = axios({
                method: 'get',
                url: urlParam,
            }).then(
                async (response) => {
                    if (response) {
                        dispatch({
                            type: COURSE_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: COURSE_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: COURSE_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}
