import {request} from "../utils";

export function getList(param) {
    return request({
        url: 'https://www.easy-mock.com/mock/5c36b5d2be0a1c39bfd57589/img/beauty/page=1',
        data: param,
        method: 'get'
    })
}