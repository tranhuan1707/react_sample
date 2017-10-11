/**
 * LESSON ACTION
 * MinhNguyen WP
 * Created on 06.2017
 */
import { ENGTOWN_API} from '../helper/constant/Site';
import {
    RESULT_POST_START,
    RESULT_POST_SUCCESS,
    RESULT_POST_FAILURE,
    RESULT_GET_START,
    RESULT_GET_SUCCESS,
    RESULT_GET_FAILURE} from '../helper/actionconst/actionTypes';

import axios from 'axios';
import _ from 'lodash';
import history from '../history';

// Action Get LESSON
export function postUserResult(params, url) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: RESULT_POST_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlUserResult;

            /*if(params && params.user_id) {
                urlParam  += '?user_id=' + params.user_id;
            }*/

            if(params && params.access_token) {
                urlParam  += '?access_token=' + params.access_token;
            }
            var qs = require('qs');
            let objParams = qs.stringify({
                learn_result: JSON.stringify(params.learn_result),
                user_id: params.user_id
            });

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
                            history.push(url);
                        }

                        dispatch({
                            type: RESULT_POST_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: RESULT_POST_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: RESULT_POST_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };

}

export function getLearnResult(level, lessonId){
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    let learn_result = null;
    if(userResult){
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let learnResultIdx = _.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
        if(learnResultIdx > -1){
            learn_result = userResult[learnResultIdx];
        }
    }
    return learn_result;
}

// save studying progress to localStorage

export function saveProgress(level, lessonId, cardId, cardItem_id, card_result) {
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    if(!userResult){
        userResult = new Array();
    }

    let learnResultIdx = _.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
    if(learnResultIdx > -1){
        let cardIdx = _.findIndex(userResult[learnResultIdx].cards, {'id': cardId});
        if(cardIdx > -1){
            let cardItemIdx = _.findIndex(userResult[learnResultIdx].cards[cardIdx].cardItems, {'id': cardItem_id});
            if(cardItemIdx == -1){
                let cardItem = {};
                cardItem.id = cardItem_id;
                cardItem.learned = 1;

                // is quiz
                if(card_result > -1){
                    cardItem.result = card_result;
                }

                userResult[learnResultIdx].cards[cardIdx].cardItems.push(cardItem);
            } else {
                if(card_result > -1){
                    userResult[learnResultIdx].cards[cardIdx].cardItems[cardItemIdx].result = card_result;
                }
            }
            //console.log(userResult);
        } else {
            // insert card
            let card = {};
            card.id = cardId;
            card.cardItems = new Array();
            let cardItem = {};
            cardItem.id = cardItem_id;
            cardItem.learned = 1;

            // is quiz
            if(card_result > -1){
                cardItem.result = card_result;
            }

            card.cardItems.push(cardItem);

            userResult[learnResultIdx].cards.push(card);
        }
    } else {
        let learn_result = {};
        learn_result.lessonId = lessonId;
        learn_result.levelId = level;
        learn_result.courseId = userInfo.course_id;
        learn_result.cards = new Array();
        let card = {};
        card.id = cardId;
        card.cardItems = new Array();
        let cardItem = {};
        cardItem.id = cardItem_id;
        cardItem.learned = 1;

        // is quiz
        if(card_result > -1){
            cardItem.result = card_result;
        }

        card.cardItems.push(cardItem);
        learn_result.cards.push(card);

        userResult.push(learn_result);
    }

    localStorage.setItem('userResult', JSON.stringify(userResult));
}

export function countAnswer(level, lessonId, cardId, result) {
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    let numberCorrectAnswer = 0;
    if(userResult){
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let learnResultIdx = _.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
        if(learnResultIdx > -1){
            let cardIdx = _.findIndex(userResult[learnResultIdx].cards, {'id': cardId});
            if(cardIdx > -1){
                let cardItems = _.filter(userResult[learnResultIdx].cards[cardIdx].cardItems, {'result': result});
                numberCorrectAnswer = cardItems.length;
            }
        }
    }
    return numberCorrectAnswer;
}

export function resetCard(level, lessonId, cardId) {
    let userResult = JSON.parse(localStorage.getItem('userResult'));
    if(userResult){
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let learnResultIdx = _.findIndex(userResult, { 'lessonId': lessonId, 'levelId': level, 'courseId': userInfo.course_id });
        if(learnResultIdx > -1){
            let cardIdx = _.findIndex(userResult[learnResultIdx].cards, {'id': cardId});
            if(cardIdx > -1){
                userResult[learnResultIdx].cards[cardIdx].cardItems = new Array();
                localStorage.setItem('userResult', JSON.stringify(userResult));
            }
        }
    }
}

// Action Get Result
export function getResult(params) {

    return async (dispatch, getState) => {
        dispatch({
            type: RESULT_GET_START,
        });

        try {
            let urlParam = ENGTOWN_API.urlUserGetResult;

            if(params && params.user_id) {
                urlParam  += '?user_id=' + params.user_id;
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
                        //console.log('response', response);
                        dispatch({
                            type: RESULT_GET_SUCCESS,
                            payload: response.data
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch({
                        type: RESULT_GET_FAILURE,
                        payload: {
                            error,
                        },
                    });
                }
            )
        // TODO save token
        } catch (error) {
            dispatch({
                type: RESULT_GET_FAILURE,
                payload: {
                    error,
                },
            });
        return false;
        }
        return true;
    };
}