import Cookies from 'js-cookie';
import store from '@/store';
import {
    MessageBox
} from 'element-ui';
const TokenKey = 'access-token';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function setRole(role) {
    return Cookies.set('role', role);
}

export function getRole() {
    return Cookies.get('role');
}
export function checkPermission(value) {
    const { user } = store.state;
    const hasPermission = user.role === 'MERCHANT' && user.info.status === 'AUDIT_PASS';
    return !hasPermission;
}
export function showPermissionMessage(value) {
    const { info } = store.state.user;
    MessageBox({
        title: '提示',
        message: `账号${info.statusDesc}, 操作失败`,
        type: 'warning'
    });
}
