const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    statusList: state => state.app.merchantStatusList,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    role: state => state.user.role,
    isOperator: state => state.user.role === 'OPERATOR'
};
export default getters;
