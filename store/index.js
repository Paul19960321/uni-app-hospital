import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userType: 0,
		userInfo: null,
		userRealName: null
	},
	mutations: {
		setUserType (state, val) {
			state.userType = val
		},
		updateUserInfo(state, val) {
			state.userInfo = val
			if (val.userRealName) {
				state.userRealName = val.userRealName
			}
		}
	}
})