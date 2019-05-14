import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options);

};

export function uploadFileShop (shopId, file) {
    return request({
        url: API_BASE_URL + '/shops/' + shopId + '/uploadFile',
        mode: 'no-cors',
        method: 'POST',
        body: file
    });
}

export function uploadFileProfile (profileId, data) {
    return axios.post(API_BASE_URL + '/profiles/' + profileId + '/uploadFile', data, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function deleteFileProfile (profileId) {
    return axios.delete(API_BASE_URL + '/profiles/' + profileId + '/uploadFile', {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}