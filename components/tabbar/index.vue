<template>
	<u-tabbar
	class="tabbar"
	:list="userType === 0 ? patientTabbar : doctorTabbar"
	icon-size="48"
	height="110"
	v-model="tabIndex"
	:border-top="false"
	:before-switch="beforeSwitch"
	:active-color="activeColor"
	:inactive-color="inactiveColor"
	mid-button-size="72"
	:mid-button="userType === 0 ? true : false"></u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				inactiveColor: '#899099',
				activeColor: '#3388FF',
				patientTabbar: [{
						iconPath: "/static/tabbar/icon-3.png",
						selectedIconPath: "/static/tabbar/icon-7.png",
						text: '我的',
						pagePath: '/pages/user/user'
					},
					{
						iconPath: "/static/tabbar/icon-9.png",
						selectedIconPath: "/static/tabbar/icon-5.png",
						text: '申请复印',
						midButton: true,
						pagePath: '/pages/index/index'
					},
					{
						iconPath: "/static/tabbar/icon-2.png",
						selectedIconPath: "/static/tabbar/icon-6.png",
						text: '存在问题',
						pagePath: '/pages/faq/faq'
					}
				],
				doctorTabbar: [{
						iconPath: "/static/tabbar/icon-9.png",
						selectedIconPath: "/static/tabbar/icon-5.png",
						text: '申请复印',
						pagePath: '/pages/index/index'
					},
					{
						iconPath: "/static/tabbar/icon.png",
						selectedIconPath: "/static/tabbar/icon-4.png",
						text: '我的',
						pagePath: '/pages/user/user'
					},
					{
						iconPath: "/static/tabbar/icon-1.png",
						selectedIconPath: "/static/tabbar/icon-8.png",
						text: '取件',
						pagePath: '/pages/express/express'
					},
					{
						iconPath: "/static/tabbar/icon-2.png",
						selectedIconPath: "/static/tabbar/icon-6.png",
						text: '常见问题',
						pagePath: '/pages/faq/faq'
					}
				]
			}
		},
		computed: {
			userType() {
				return this.$store.state.userType
			}
		},
		methods: {
			beforeSwitch(index) {
				if ((this.userType === 0 && index === 1) || (this.userType === 1 && index === 0)) {
					uni.navigateTo({
						url: '../../pages/apply/apply-print'
					})
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style>

</style>