import { prodApiUrl, devpApiUrl } from '..//static/config.js'
import omit from 'lodash/omit'
import { logout } from './utils.js'

function handleErr(res) {
	const { data, statusCode } = res
	switch (statusCode) {
		case 401:
			uni.showToast({
				icon: 'none',
				position: 'top',
				mask: true,
				title: '登录超时，请重新登录',
				duration: 2000,
				success() {
					setTimeout(function() {
						logout()
					}, 2000)
				}
			})
			break
		default:
			uni.showToast({
				icon: 'none',
				position: 'top',
				title: data || '网络错误，请稍后重试'
			})
			break
	}
}

const request = options => new Promise((resolve, reject) => {
	const token = uni.getStorageSync('token')
	const _options = omit(options, ['url'])
	if (!!token) {
		_options.header = {
			token: token
		}
	}
	uni.request({
		url: (process.env.NODE_ENV === 'development' ? devpApiUrl : prodApiUrl) + options.url,
		..._options,
		success(res) {
			const { data, statusCode } = res
			if (/^2\d\d/.test(statusCode)) {
				return resolve(data)
			} else {
				handleErr(res)
				return reject(res)
			}
		},
		fail(err) {
			uni.showToast({
				icon: 'none',
				position: 'top',
				title: '网络错误，请稍后重试'
			})
			return reject(res)
		}
	})
})

export const uploadFile = (options) => new Promise((resolve, reject) => {
	const token = uni.getStorageSync('token')
	if (!!token) {
		options.header = {
			token: token
		}
	}
	uni.uploadFile({
		url: `${process.env.NODE_ENV === 'development' ? devpApiUrl : prodApiUrl}/passport/sys/oss/upload?token=${token}`,
		...options,
		success(res) {
			const { data, statusCode } = res
			if (/^2\d\d/.test(statusCode)) {
				if (typeof data === 'string' && /^\{.*\}$/.test(data)) {
					return resolve(JSON.parse(data))
				} else {
					return resolve(data)
				}
			} else {
				handleErr(res)
			}
		},
		fail(err) {
			uni.showToast({
				icon: 'none',
				position: 'top',
				title: '网络错误，请稍后重试'
			})
			return reject(res)
		}
	})
}) 

export default request