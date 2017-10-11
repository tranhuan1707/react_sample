import { ENGTOWN_API} from './constant/Site';
import axios from 'axios';

export default {
    getSubLesson(params, successCB, errorCB) {
        let urlParam = ENGTOWN_API.urlSubLesson;

        if(params && params.lesson_id) {
            urlParam  += '?lesson_id=' + params.lesson_id;
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
                    if (typeof successCB === 'function') {
                        successCB(response.data)
                    }
                }
            }
        )
        .catch(
            (error) => {
                errorCB(error);
            }
        )
    },

    reportIssue(params, successCB, errorCB) {
        let urlParam = ENGTOWN_API.urlPostReport;

        if(params && params.token) {
            urlParam  += '?access_token=' + params.token;
        }
        var qs = require('qs');
        let objParams = qs.stringify({
            user_id : params.user_id,
            item_id: params.lesson_id,
            message : params.message,
            link: params.link
        });
        
        const request = axios({
            method: 'post',
            url: urlParam,
            data: objParams,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(
            async (response) => {
                if (response) {
                    if (typeof successCB === 'function') {
                        successCB(response.data)
                    }
                }
            }
        )
        .catch(
            (error) => {
                errorCB(error);
            }
        )
    }
}