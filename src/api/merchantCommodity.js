import request from '@/utils/request';

export function getList(params) {
    return request({
        url: '/api/v1/merchant/commodity/getCommodityList',
        method: 'get',
        params
    });
}
export function soldOut(params) {
    return request({
        url: '/api/v1/merchant/commodity/soldOutCommodity',
        method: 'post',
        params
    });
}
export function putAway(params) {
    return request({
        url: '/api/v1/merchant/commodity/putawayCommodity',
        method: 'post',
        params
    });
}
export function add(params) {
    return request({
        url: '/api/v1/merchant/commodity/addCommodity',
        method: 'post',
        params
    });
}
export function getDetail(params) {
    return request({
        url: '/api/v1/merchant/commodity/getCommodityDetail',
        method: 'get',
        params
    });
}
export function modify(params) {
    return request({
        url: '/api/v1/merchant/commodity/modifyCommodity',
        method: 'post',
        params
    });
}
