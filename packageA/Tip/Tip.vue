<template>
	<view class="tip">
		<view class="tip-header">
			<view class="tip-header-avatar">
				<image src="../../static/image/2.png" mode=""></image>
			</view>
			<view class="tip-header-center">GG来送 - 同城跑腿</view>
			<view class="tip-header-bottom">
				<image src="../../static/image/qrcode.png" show-menu-by-longpress  mode=""></image>
			</view>
		</view>
		<view class="tip-bottom">
			<h3>如何安装APP</h3>
			<view>1.长按二维码保存至相册</view>
			<view>2.使用微信扫一扫相册中的二维码</view>
			<view>3.按照提示安装GG来送APP</view>
		</view>
		<view class="submit-button" @click="goToCourse">安装演示</view>
	</view>
</template>

<script>
	export default {
		data () {
			return{
				
			}
		},
		methods: {
			goToCourse () {
				uni.navigateTo({
					url: '../Course/Course'
				})
			}
		}
	}
</script>

<style lang="less">
	.tip{
		width: 100%;
		height: 100%;
		.tip-header{
			width: 100%;
			height: 790rpx;
			background-image: url(../../static/image/6.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.tip-header-avatar{
				padding-top: 258rpx;
				box-sizing: border-box;
				image{
					width: 120rpx;
					height: 120rpx;
				}
			}
			.tip-header-center{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #5468FF;
				text-align: center;
				font-weight: bold;
				padding: 20rpx 0;
				box-sizing: border-box;
			}
			.tip-header-bottom{
				image{
					width: 284rpx;
					height: 284rpx;
				}
			}
		}
		.tip-bottom{
			width: 100%;
			text-align: center;
			h3{
				font-family: PingFangSC-Medium;
				font-size: 17px;
				color: #09023E;
				font-weight: bold;
				padding-top: 40rpx;
				padding-bottom: 24rpx;
				box-sizing: border-box;
			}
			view{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.60);
				padding-bottom: 10rpx;
				box-sizing: border-box;
			}
		}
		.submit-button{
			width: 690rpx; 
			height: 90rpx;
			margin: 0 auto;
			text-align: center;
			line-height: 90rpx;
			background: #5468FF;
			border-radius: 22.5px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			letter-spacing: -0.34px;
			margin-top: 42rpx;
			box-sizing: border-box;
		}
	}
</style>
