import { login, getInfo, refreshToken } from '@/api/user';
import {
  getToken,
  setToken,
  removeToken,
  setRole,
  getRole
} from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  info: {},
  role: getRole()
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
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  },
  CLEAR: state => {
    state.token = '';
    state.name = '';
    state.avatar = '';
    state.role = '';
    state.info = {};
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, role } = userInfo;
    return new Promise((resolve, reject) => {
      login({ phone: username.trim(), password: password, role })
        .then(response => {
          const { data } = response;
          commit('SET_TOKEN', data.accessToken);
          commit('SET_ROLE', role);
          setRole(role);
          setToken(data.accessToken);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (!state.role) {
        reject('no role');
      }
      getInfo(state.role)
        .then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }
          const { name, avatar } = data;
          commit('SET_INFO', data);
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('CLEAR');
      removeToken();
      resetRouter();
      setRole('');
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },

  refreshToken({ commit }) {
    return new Promise(resolve => {
      refreshToken({ refreshToken: '' }).then(response => {
        const { data } = response;
        commit('SET_TOKEN', data.accessToken);
        resolve();
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
