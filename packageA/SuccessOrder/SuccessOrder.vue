<template>
	<view class="successOrder">
		<view class="successOrder-header">
			<view class="successOrder-header-top">
				<image src="../../static/image/8.png" mode=""></image>
			</view>
			<view class="successOrder-header-center">
				下单成功
			</view>
			<view class="successOrder-header-bottom">
				成功支付，附近的骑手会尽快给您派单
			</view>
			
		</view>
		<view class="successOrder-main">
			<view class="successOrder-main-item">
				<view class="successOrder-main-item-left">订单编号</view>
				<view class="successOrder-main-item-right">{{orderInfo.orderNo}}</view>
			</view>
			<view class="successOrder-main-item">
				<view class="successOrder-main-item-left">发布时间</view>
				<view class="successOrder-main-item-right">{{orderInfo.createTime}}</view>
			</view>
			<view class="successOrder-main-item">
				<view class="successOrder-main-item-left">合计金额</view>
				<view class="successOrder-main-item-right">¥{{orderInfo.payAmount}}</view>
			</view>
		</view>
		<view class="successOrder-footer">
			<view class="successOrder-footer-top">
				<view class="successOrder-footer-top-header">查看订单详情</view>
				<view class="successOrder-footer-top-bottom">请下载"GG来送"最新版本APP</view>
			</view>
			<view class="successOrder-footer-image">
				<image src="../../static/image/qrcode.png" mode="" show-menu-by-longpress></image>
			</view>
			<view class="successOrder-footer-header">扫描上方二维码下载APP</view>
			<!-- <view class="successOrder-footer-bottom">
				请下载最新版APP查看订单详情
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.orderId = options.orderId
			this.initOrderDetail()
			uni.removeStorageSync('takeTimer')
			uni.removeStorageSync('shopInfo')
			uni.removeStorageSync('discount')
			uni.removeStorageSync('remark')
			uni.removeStorageSync('noSetSend')
		},
		data () {
			return {
				orderId: '',
				orderInfo: {}
			}
		},
		methods: {
			async initOrderDetail () {
				console.log(this.orderId)
				let res = await this.$fetch(this.$api.orderDetail,{id: this.orderId},"POST","Form")
				console.log(res)
				this.orderInfo = res.data
				
			}
		}
	}
</script>

<style lang="less">
	.successOrder{
		padding-top: 70rpx;
		box-sizing: border-box;
		.successOrder-header{
			padding-bottom: 30rpx;
			box-sizing: border-box;
			.successOrder-header-top{
				text-align: center;
				image{
					width: 248rpx;
					height: 218rpx;
				}
			}
			.successOrder-header-center{
				font-family: PingFangSC-Regular;
				font-size: 22px;
				color: #09023E;
				text-align: center;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
			}
			.successOrder-header-bottom{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				text-align: center;
			}
		}
		.successOrder-main{
			.successOrder-main-item{
				display: flex;
				text-align: center;
				align-items: center;
				padding-bottom: 10rpx;
				box-sizing: border-box;
				.successOrder-main-item-left{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.40);
					padding-left: 158rpx;
					padding-right: 20rpx;
					box-sizing: border-box;
				}
				.successOrder-main-item-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
				}
			}
		}
		.successOrder-footer{
			
			text-align: center;
			// padding-top: 104rpx;
			padding-top: 30rpx;
			box-sizing: border-box;
			.successOrder-footer-top{
				width: 600rpx;
				height: 130rpx;
				border-radius: 70rpx;
				
				background-color: #3d5afe;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: 0 auto;
				.successOrder-footer-top-header{
					font-size: 16px;
					color: #FFFFFF;
					font-weight: bold;
					padding-bottom: 20rpx;
				}
				.successOrder-footer-top-bottom{
					font-size: 14px;
					color: #FFFFFF;
					font-weight: bold;
				}
			}
			.successOrder-footer-header{
				font-weight: bold;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #09023E;
				text-align: center;
			}
			.successOrder-footer-image{
				padding: 30rpx 0;
				box-sizing: border-box;
				image{
					width: 284rpx;
					height: 284rpx;
				}
			}
			.successOrder-footer-bottom{
				width: 500rpx;
				height: 68rpx;
				line-height: 80rpx;
				margin: 0 auto;
				background-image: url(../../static/image/10.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
