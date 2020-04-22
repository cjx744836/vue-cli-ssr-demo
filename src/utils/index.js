import axios from 'axios';

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export function request(ops) {
    return axios({
        url: ops.url,
        data: ops.data,
        method: ops.method || 'get',
        timeout: 15000
    });
}