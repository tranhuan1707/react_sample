/**
 * LESSONS ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API} from '../helper/constant/Site';
import {
    LESSONS_START,
    LESSONS_SUCCESS,
    LESSONS_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';

// Action Get LESSONS
export function getLessons(params) {

    return async (dispatch, getState) => {
        dispatch({
            type: LESSONS_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlLessons;

            if(params && params.course_id) {
                urlParam  += '?course_id=' + params.course_id;
            }

            if(params && params.user_id) {
                urlParam  += '&user_id=' + params.user_id;
            }

            if(params && params.level) {
                urlParam  += '&level=' + params.level;
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
                            type: LESSONS_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: LESSONS_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: LESSONS_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}