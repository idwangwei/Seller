import { login, logout, getInfo, refreshPicVerfify } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    picVerifyUri: ''
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    }
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password, role } = userInfo;
        return new Promise((resolve, reject) => {
            login({ phone: username.trim(), password: password, role }).then(response => {
                const { data } = response;
                commit('SET_TOKEN', data.accessToken);
                setToken(data.accessToken);
                resolve();
            }).catch(error => {
                debugger;
                reject(error);
            });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response;
                debugger;
                if (!data) {
                    reject('Verification failed, please Login again.');
                }

                const { name, avatar } = data;

                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            // logout().then(() => {
                commit('SET_TOKEN', '');
                removeToken();
                resetRouter();
                resolve();
            // }).catch(error => {
            //     reject(error);
            // });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            removeToken();
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

