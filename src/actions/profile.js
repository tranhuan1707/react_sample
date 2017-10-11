/**
 * PROFILE ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API } from '../helper/constant/Site';
import {
    PROFILE_START,
    PROFILE_SUCCESS,
    PROFILE_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';

// Action Get PROFILE
export function getProfile(params) {
    
    return async (dispatch, getState) => {
        dispatch({
            type: PROFILE_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlProfile;
            // debugger
            urlParam += '?user_id=24';

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
                            type: PROFILE_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: PROFILE_FAILURE,
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
