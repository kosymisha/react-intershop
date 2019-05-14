import { request } from './APIUtils';
import { API_BASE_URL } from "../constants";

export function getAdvertList () {
    return request({
        url: API_BASE_URL + '/adverts',
        method: 'GET'
    });
}

export function createAdvert (advert) {
    return request({
        url: API_BASE_URL + '/adverts',
        method: 'POST',
        body: JSON.stringify(advert)
    });
}

export function deleteAdvert (advertId) {
    return request({
        url: API_BASE_URL + '/adverts/' + advertId,
        method: 'DELETE'
    });
}

export function setActiveAdvert (advertId, advert) {
    return request({
        url: API_BASE_URL + '/adverts/' + advertId,
        method: 'PUT',
        body: JSON.stringify(advert)
    });
}