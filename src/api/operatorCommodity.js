import request from '@/utils/request';

export function getMaxConnectionList(params) {
    return request({
        url: '/api/v1/manager/commodity/getMaxConnectionList',
        method: 'get',
        params
    });
}
export function getMaxInterestList(params) {
    return request({
        url: '/api/v1/manager/commodity/getMaxInterestList',
        method: 'get',
        params
    });
}
export function getListByMerchantId(params) {
    return request({
        url: '/api/v1/manager/commodity/getCommodityList',
        method: 'get',
        params: { role: 'OPERATOR', ...params }
    });
}
export function getDetail(params) {
    return request({
        url: '/api/v1/manager/commodity/getCommodityDetail',
        method: 'get',
        params
    });
}
export function refused(params) {
    return request({
        url: '/api/v1/manager/commodity/refusedCommodity',
        method: 'post',
        params
    });
}
export function pass(params) {
    return request({
        url: '/api/v1/manager/commodity/passCommodity',
        method: 'post',
        params
    });
}

export function soldOut(params) {
    return request({
        url: '/api/v1/manager/commodity/soldOutCommodity',
        method: 'post',
        params
    });
}
