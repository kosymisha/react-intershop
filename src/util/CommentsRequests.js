import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import { request } from './APIUtils';
import axios from 'axios';

export function createShopComment (shopId, newComment) {
    return axios.post(API_BASE_URL + '/shops/' + shopId + '/comments', newComment, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getShopComments (shopId) {
    return axios.get(API_BASE_URL + '/shops/' + shopId + '/comments', { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function getAdvertComments (advertId) {
    return request({
        url: API_BASE_URL + '/adverts/' + advertId + '/comments',
        method: 'GET'
    });
}

export function deleteComment (commentId) {
    let options = {
        url: API_BASE_URL + '/comments/' + commentId,
        method: 'DELETE'
    };
    let headers = new Headers({
        'Content-Type': 'application/json',
    });
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options);
}