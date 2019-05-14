import { request } from './APIUtils';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";

export function deleteProfile (profileId) {
    return axios.delete(API_BASE_URL + '/profiles/' + profileId, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function updatePassword (profileId, newPassword) {
    return axios.put(API_BASE_URL + '/profiles/' + profileId + '/password', newPassword, {headers:{
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }});
}

export function createProfile (newProfile) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(newProfile)
    });
}

export function getProfile (profileId) {
    return request({
        url: API_BASE_URL + "/profiles/" + profileId,
        method: 'GET'
    });
}

export function getProfiles () {
    return request({
        url: API_BASE_URL + "/profiles",
        method: 'GET'
    });
}

export function setActive (profileId, value) {
    return request({
        url: API_BASE_URL + "/profiles/" + profileId + '/active',
        method: 'PUT',
        body: value
    });
}

export function setRole (profileId, role) {
    return request({
        url: API_BASE_URL + "/profiles/" + profileId + '/role',
        method: 'PUT',
        body: role
    });
}

export function updateProfile (profileId, newProfile) {
    return request({
        url: API_BASE_URL + "/profiles/" + profileId,
        method: 'PUT',
        body: JSON.stringify(newProfile)
    });
}
