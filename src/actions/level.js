/**
 * LEVEL ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API} from '../helper/constant/Site';
import {
    LEVEL_START,
    LEVEL_SUCCESS,
    LEVEL_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';

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

// Action Get Level
export function getLevel(params) {

    return async (dispatch, getState) => {
        dispatch({
            type: LEVEL_START,
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
                            type: LEVEL_SUCCESS,
                            payload: response.data
                        });

                        // called js for menu nav
                        slideHeaderNav();

                        // set level
                        localStorage.setItem('levelCourse', JSON.stringify(response.data.data));
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: LEVEL_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: LEVEL_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}