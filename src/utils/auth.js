import Cookies from 'js-cookie';

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
