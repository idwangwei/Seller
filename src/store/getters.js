const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    statusList: state => state.app.merchantStatusList,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    role: state => state.user.role,
    isOperator: state => state.user.role === 'OPERATOR',
    commodityStatusList: state => {
        // if (!state.commodity.commodityStatusList.length) {
        //     store.dispatch("commodity/getCommodityStatusList");
        // }
        return state.commodity.commodityStatusList;
    },
    commodityBrandList: state => {
        // if (!state.commodity.commodityBrandList.length) {
        //     store.dispatch("commodity/getCommodityBrandList");
        // }
        return state.commodity.commodityBrandList;
    },
    carTypeList: state => {
        // if (!state.commodity.carTypeList.length) {
        //     store.dispatch("commodity/getCarTypeList");
        // }
        return state.commodity.carTypeList;
    }
};
export default getters;
