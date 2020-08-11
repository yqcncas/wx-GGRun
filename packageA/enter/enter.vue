<template>
	<view class="enter">
		<view class="enter-scroll" >
			<view class="enter-scroll">
				<view class="scroll-item" :class="{on:scrollIndex === 0}"  @tap="handleScrollList(0)">微信授权登录</view>
				
				<view class="scroll-item phone " :class="{on:scrollIndex === 1}" @tap="handleScrollList(1)">手机账号登录</view>
			</view>
		</view>
		<!-- 手机登录 -->
		<view v-show="scrollIndex === 1">
			<view class="enter-main">
				<view class="enter-phone">
					<view class="phone-header">
						<view class="phone-icon">
							<image src="../../static/image/order/newphone.png" mode="aspectFill"></image>
						</view>
						<view class="phone-title">手机</view>
					</view>
					<input type="number" v-model="phone" class="phone-input" placeholder="请输入您的手机号" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
				</view>
				
				<view class="enter-password">
					<view class="password-header">
						<view class="password-icon">
							<image src="../../static/image/order/slock2.png" mode="widthFix"></image>
						</view>
						<view class="password-title">密码</view>
					</view>
					<input type="password" v-model="pwd" class="password-input" placeholder="请输入您的密码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
				</view>
			</view>
			<view class="enter-center">
				<view class="center-left" @tap="goToForgetPwd">忘记密码</view>
				<view class="center-right" @tap="goToRegister">注册账号</view>
			</view>
			<view class="enter-login">
			<view class="enter-login-inside" @tap="login">登录</view>
		</view>
		</view>
		<!-- 微信登录 -->

		<view class="mp-login-wrapper" v-if="scrollIndex == 0">
			<view class="mp-login-wrapper-header">
				<image src="../../static/image/order/wxlogin.png" mode="aspectFill"></image>
			</view>
			<button open-type="getUserInfo" @getuserinfo="getInfo" class="mp-showquan" :class="{endShowquan: getPhoneFlag}">
				<view class="mp-login-wrapper-bottom-text" :class="{endShowquantext: getPhoneFlag}">微信授权</view>
			</button>
			<uni-popup ref="popupPhone" type="center" :maskClick = 'false'>
				<view class="popupPhone-top">提示</view>
				<view class="popupPhone-header">为了更良好的体验，请授权手机号</view>
				<button open-type="getPhoneNumber" class="mp-login-wrapper-bottom" :class="{endShowquan: userPhoneFlag}" @getphonenumber ="wxLogin">
					<view class="mp-login-wrapper-bottom-text" :class="{endShowquantext: userPhoneFlag}">授权手机号</view>
				</button>
			</uni-popup>
			
			
			
	
		</view>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	var WXBizDataCrypt = require('../../crypto/WXBizDataCrypt.js');  
	export default {
		onLoad() {
			// uni.setStorageSync('loginFlag', 1)
			if(uni.getStorageSync('user_phone')) {
				this.phone = uni.getStorageSync('user_phone')
			}
			if (uni.getStorageSync('phoneLoginWay')) {
				this.scrollIndex = 1
				uni.removeStorageSync('phoneLoginWay')
			}
			let data = uni.getSystemInfoSync();
			this.platform = data.platform;
			console.log(this.platform == 'android')
		},
		components:{
			uniPopup
		},
		onHide() {
			uni.setStorageSync('loginFlag', 1)
		},
		onShow() {
			let data = uni.getSystemInfoSync();
			this.platform = data.platform;
		},
		data () {
			return{
				phone: '',
				pwd: '',
				scrollIndex:0,
				cid: '',
				uniId: '',
				nickName: '',
				avatarUrl: '',
				platform: '',
				code: '',
				openid: '',
				session_key: '',
				unionid: '',
				appId: 'wx68da8cf05eb80bfb',
				getPhoneFlag: false,
				userPhoneFlag: false
			}
		},
		methods: {
			handleScrollList(scrollIndex){
				this.scrollIndex = scrollIndex
				this.pwd = ""
			},
			//到注册页面
			goToRegister () {
				uni.navigateTo({
					url:"../../packageA/register/register"
				})
			},
			//到修改密码
			goToForgetPwd () {
				uni.navigateTo({
					url: '../ChangePwd/changePwd?status=0'
				})
			},
			//登录
			async login () {
				
				if (this.phone.trim() === '' || this.pwd.trim() === "") {
					uni.showToast({
						icon: 'none',
						title: '请先输入手机或密码'
					})
					return
				}

				let res = await this.$fetch(this.$api.customerLogin,{loginName: this.phone,password: this.pwd, cid: ''},'POST',"Form")
				this.resMsg = res.msg
				if (res.code == 0) {
					uni.setStorageSync('token',res.data.token)
			
					uni.showToast({
						icon:'success',
						title: '登录成功'
					})
					
					setTimeout(() => {
						uni.reLaunch({
							// url:'../storage/storage'
							url: '../../packageA/storage/storage'
						})
					},1500)
				} else {
					uni.showToast({
						icon:'none',
						title: res.msg
					})
	
				}
				
			},
			async wxLogin (e) {
				if (!this.getPhoneFlag) return uni.showToast({
					icon: 'none',
					title: '请先进行微信授权'
				})
				uni.showLoading({
					title: '正在登陆中...'
				})
				this.userPhoneFlag = true
				uni.login({
				  provider: 'weixin',
				  success:  async(loginRes) => {
			
	
					  this.code = loginRes.code
				    // 获取用户信息
				 
					uni.hideLoading()
					let res = await this.$fetch(this.$api.newWxLogin, {userType:2, code: this.code},'POST','FORM')
					console.log(res)
					this.openid = res.data.openid
					uni.setStorageSync('openId', this.openid)
					this.session_key = res.data.session_key
			
					
			
		
					var pc = new WXBizDataCrypt(this.appId, this.session_key)
					var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
			
					
					
					let msg = await this.$fetch(this.$api.userWxLogin, {mobile: data.phoneNumber, unionId: this.unionid},"POST", "FORM")
				
					if (msg.code == 0) {
						uni.showToast({
							icon: 'success',
							title: '登录成功'
						})
						uni.setStorageSync('token',msg.data.token)
						
						setTimeout(() => {
							uni.reLaunch({
								url: '../../packageA/storage/storage'
							})
						}, 1500)
					} else {
						uni.showToast({
							icon: 'none',
							title: '未绑定手机号'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../register/register'
							})
						}, 1500)
					}		   
				  }
				});
			},
			getInfo (e) {
		
				
				uni.login({
				  provider: 'weixin',
				  success:  async(loginRes) => {
		
					  this.code = loginRes.code
				    // 获取用户信息
				 
					uni.hideLoading()
					let res = await this.$fetch(this.$api.newWxLogin, {userType:2, code: this.code},'POST','FORM')
	
					this.openid = res.data.openid
					uni.setStorageSync('openId', this.openid)
					this.session_key = res.data.session_key
			
		
					var pc = new WXBizDataCrypt(this.appId, this.session_key)
					var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
			
					var userUnionid = data.unionId
	
					this.unionid = userUnionid
					if (this.unionid) {
						this.getPhoneFlag = true
						uni.showToast({
							icon: 'success',
							title: '授权成功'
						})
						this.$refs.popupPhone.open()
					}
					
				  }
				});
				
			}
		}
	}
</script>

<style lang="less">
	.enter{
		width: 100%;
		.enter-scroll{
			width: 100%;
			height: 160rpx;
			display: flex;
			justify-content: center;align-items: center;
			.scroll-item{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				position: relative;
				padding-bottom: 10rpx;
				box-sizing: border-box;
				&.iosNoShow{
					display: none;
				}
				&.phone{
					margin-left: 90rpx;
					box-sizing: border-box;
				}
				&.on{
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #5468FF;
					&:after{
						width: 30%;
					}
				}
				&::after{
					content: '';
					width: 0;
					height: 0;
					border-bottom: 4rpx solid #5468FF;
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					transition: 0.5s;
				}
			}
		}
		.enter-main{
			padding-left: 80rpx;
			padding-right: 80rpx;
			padding-top: 110rpx;
			box-sizing: border-box;
			.enter-phone{
				border-bottom: 1rpx solid #F7F7FA;
				box-sizing: border-box;
				.phone-header{
					display: flex;
					align-items: center;
					margin-bottom: 38rpx;
					box-sizing: border-box;
					.phone-icon{
						image{
							width: 28rpx;
							height: 38rpx;
							
						}
					}
					.phone-title{
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						font-weight: bold;
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
				.phone-input{
					width: 100%;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding-left: 60rpx;
					box-sizing: border-box;
					font-size: 16px;
				}
			}
			.enter-password{
				padding-top: 40rpx;
				border-bottom: 1rpx solid #F7F7FA;
				box-sizing: border-box;
				.password-header{
					display: flex;
					align-items: center;
					margin-bottom: 38rpx;
					box-sizing: border-box;
					.password-icon{
						
						image{
							width: 28rpx;
							height: 38rpx;
							transform: translateY(-2rpx);
						}
					}
					.password-title{
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						font-weight: bold;
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
				.password-input{
					width: 100%;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding-left: 60rpx;
					box-sizing: border-box;
					font-size: 16px;
				}
			}
		}
		.enter-center{
			width: 100%;
			padding: 0 80rpx;
			padding-top: 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.center-left,.center-right{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
			}
		}
		.enter-login{
			margin: 0 auto;
			margin-top: 150rpx;
			width: 532rpx;
			height: 92rpx;
			line-height: 92rpx;
			text-align: center;
			transform: rotate(-360deg);
			border: 1px solid #5468FF;
			border-radius: 23px;
			border-radius: 23px;
			box-sizing: border-box;
			padding: 4rpx;
			.enter-login-inside{
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 86rpx;
				border-radius: 23px;
				border-radius: 23px;
				background-color: #5468FF;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
			
		}
		.wx-login{
				margin: 400rpx 30rpx 0 30rpx;
				width: 690rpx;
				height: 90rpx;
				background: #5468FF;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				color: #FFFFFF;
				border-radius: 22px;
				image{
					width: 58rpx;
					height: 46rpx;
					margin-right: 20rpx;
				}
			}
	}
		.mp-login-wrapper{
			.mp-login-wrapper-header{
				text-align: center;
				image{
					width: 200rpx;
					height: 200rpx;
				}
			}
			.mp-showquan{
				margin: 0 auto;
				margin-top: 150rpx;
				width: 532rpx;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				transform: rotate(-360deg);
				border: 1px solid #5468FF;
				border-radius: 23px;
				border-radius: 23px;
				box-sizing: border-box;
				padding: 4rpx;
				&.endShowquan{
					border: 1px solid #c8c9cc;
				}
				.mp-login-wrapper-bottom-text{
					width: 100%;
					height: 100%;
					text-align: center;
					line-height: 86rpx;
					border-radius: 23px;
					border-radius: 23px;
					background-color: #5468FF;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: -0.34px;
					&.endShowquantext{
						background-color: #c8c9cc;
					}
					text{
						font-size: 14px;
						padding-right: 8rpx;
						vertical-align: bottom;
					}
				}
			}
			.mp-login-wrapper-bottom{
				margin: 0 auto;
				margin-top: 30rpx;
				width: 532rpx;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				transform: rotate(-360deg);
				border: 1px solid #5468FF;
				border-radius: 23px;
				border-radius: 23px;
				box-sizing: border-box;
				padding: 4rpx;
				&.endShowquan{
					border: 1px solid #c8c9cc;
				}
				.mp-login-wrapper-bottom-text{
					width: 100%;
					height: 100%;
					text-align: center;
					line-height: 86rpx;
					border-radius: 23px;
					border-radius: 23px;
					background-color: #5468FF;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: -0.34px;
					&.endShowquantext{
						background-color: #c8c9cc;
					}
					text{
						font-size: 14px;
						padding-right: 8rpx;
						vertical-align: bottom;
					}
				}
			}
		/deep/.uni-popup__wrapper-box {
			width: 600rpx;
			height: 400rpx;
			background-color: #fff;
			text-align: center;
			border-radius: 18rpx;
			.popupPhone-top{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #C0C0C0;
				font-size: 16px;
				font-weight: bold;
			}
			.popupPhone-header{
				width: 100%;
				font-size: 16px;
				font-weight: bold;
				padding-top: 50rpx;
				padding-bottom: 30rpx;
				
			}
		}
	}
	
</style>
