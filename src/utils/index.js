import axios from 'axios';


let instance = axios.create({
    timeout: 0,
});

instance.interceptors.request.use(config => {
    if(config.method === 'get') {
        config.params = config.data;
    } else {
        config.transformRequest = [function(v) {
            let ret = [];
            v = v || {};
            Object.keys(v).forEach(k => {
                ret.push(k + '=' + v[k]);
            });
            return ret.join('&');
        }];
    }
    return config;
}, err => {
    return Promise.reject(err);
});

instance.interceptors.response.use(response => {
    let data = response.data;
    if(typeof data === 'object' && data.code === 0) {
        return data;
    }
    return Promise.reject(data);
}, err => {
    return Promise.reject(err);
});

export default instance;