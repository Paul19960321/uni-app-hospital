import request from './httpRequest.js'

export function logout() {
	console.log(1)
	request({
		url: '/passport/sys/logout',
		method: 'post'
	}).then(() => {
		uni.clearStorage()
		uni.redirectTo({
			url: '/pages/login/login'
		})
	})
}