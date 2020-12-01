import request from "../utils";

export function getList(param) {
    return request({
        url: 'http://192.168.110.17:8919/getList',
        data: param,
        method: 'get'
    })
}