/**
 * LESSON ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API} from '../helper/constant/Site';
import {
    LESSON_START,
    LESSON_SUCCESS,
    LESSON_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';

// Action Get LESSON
export function getLesson(params) {

    return async (dispatch, getState) => {
        dispatch({
            type: LESSON_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlLesson;

            if(params && params.card_id) {
                urlParam  += '?card_id=' + params.card_id;
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
                            type: LESSON_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: LESSON_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: LESSON_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}
