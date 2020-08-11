<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.removeStorageSync('sendAddress')
			uni.removeStorageSync('endAddress')
			uni.removeStorageSync('shopInfo')
			uni.removeStorageSync('discount')
			// uni.removeStorageSync()
			uni.login({
			  provider: 'weixin',
			  success:  async(loginRes) => {
				  console.log(loginRes)
				  // this.uniId = loginRes.authResult.unionid
				let code = loginRes.code
				let res = await this.$fetch(this.$api.newWxLogin, {userType:2, code: code},'POST','FORM')
	
				let openid = res.data.openid
				uni.setStorageSync('openId', openid)

			  }
			});
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		width: 100%;
		height: 100%;
	}
</style>
