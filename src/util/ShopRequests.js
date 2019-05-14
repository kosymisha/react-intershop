import { request } from './APIUtils';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from 'axios';

export function getShopList () {
    return request({
        url: API_BASE_URL + "/shops",
        method: 'GET'
    });
}

export function getShop (shopId) {
    return axios.get(API_BASE_URL + '/shops/' + shopId, { headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function createShop (shop) {
    return request({
        url: API_BASE_URL + '/shops',
        method: 'POST',
        body: JSON.stringify(shop)
    });
}

export function updateShop (shopId, shop) {
    return request({
        url: API_BASE_URL + "/shops/" + shopId,
        method: 'PUT',
        body: JSON.stringify(shop)
    });
}

export function deleteShop (shopId) {
    let options = {
        url: API_BASE_URL + '/shops/' + shopId,
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