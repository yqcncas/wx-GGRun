<template>
	<view class="shop-info">
		<view class="shop-header">
			<view class="header-title">商品类型</view>
			<view class="header-box">
				<view class="header-item" :class="{on:index == currentIndex}" v-for="(item,index) in shopList" :key = "index" @tap="handleCurrent(item,index)">{{item}}</view>
				<view class="header-item" @tap="choiceElese" :class="{on:showElse}">其他</view>
				<view class="input-box">
					<input type="text" placeholder="请填写其他类型" @tap="handleElseShop"
					placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);" 
					class="header-input"
					v-model="elseShop"
					:focus="showElse"
					>
				</view>
			</view>
		</view>
		<view class="shop-middle">
			<view class="middle-left">
				<view class="middle-title">预估重量</view>
				<view class="middle-tip">实际重量以派送员确定为准</view>
			</view>
			<view class="middle-right">
				<view class="sub" @tap="weightSub">
					<image src="../../static/image/order/sub.png" mode="aspectFill"></image>
				</view>
				<view class="middle-center">
					<input type="number" class="middle-input" v-model="weight" @blur="checkWeight">
					<view class="middle-kilo">公斤内</view>
				</view>
				<view class="add" @tap="weightAdd">
					<image src="../../static/image/order/add.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="shop-footer">
			<view class="footer-left">
				商品预估价
				<text class="footer-left-text">（最高¥500）</text>
				<view class="footer-left-botton">请填写商品实际价格</view>
			</view>
		
			
			<view class="middle-right">
				<view class="sub" @tap="priceSub">
					<image src="../../static/image/order/sub.png" mode="aspectFill"></image>
				</view>
				<view class="middle-center">
					<input type="number" class="middle-input" v-model="price" @blur="checkPrice">
					<view class="middle-kilo">元</view>
				</view>
				<view class="add" @tap="priceAdd">
					<image src="../../static/image/order/add.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="shop-button" @tap="goBack">确定</view>
	</view>
</template>

<script>
	export default {
		onShow(){
			
			if (uni.getStorageSync('shopInfo')) {
				this.shopInfo = uni.getStorageSync('shopInfo')
				this.currentIndex = this.shopInfo.index
				this.weight = this.shopInfo.weight
				this.price = this.shopInfo.price
				if(this.shopInfo.status == 0) {
					this.choiceElese()
					this.elseShop = this.shopInfo.main
				} else {
					this.shopInfoMain = this.shopInfo.main
				}
			}
		},
		data () {
			return {
				shopList: [],
				currentIndex: 0,
				// 其他商品
				elseShop:'',
				// 重量
				weight: 1,
				//价值
				price: 1,
				//其他
				showElse: false,
				//选中的内容
				shopInfoMain: '',
				shopInfo: {}
			}
		},
		onLoad(){
			this.initGoodsInfo()
		},
		onUnload() {
			uni.hideKeyboard()
		},
		methods: {
			//更改下标
			handleCurrent (item,index) {
				// console.log(item)
				this.shopInfoMain = item
				this.currentIndex = index
				this.shopInfo.index = index
				this.showElse = false
			},
			//头部input
			handleElseShop () {
				this.currentIndex = -1
				this.showElse = true
			},
			//重量
			weightSub () {
				this.weight = Number(this.weight) - 1
				if (this.weight <= 0) {
					uni.showToast({
						icon: 'none',
						title: '重量不能再低啦'
					})
					this.weight = 1
				}
			},
			weightAdd () {
				this.weight = Number(this.weight) + 1
			},
			//价值
			priceSub () {
				this.price = Number(this.price) - 1
				if (this.price <= 0) {
					uni.showToast({
						icon: 'none',
						title: '价格不能再低啦'
					})
					this.price = 1
				}
			},
			priceAdd () {
				this.price = Number(this.price) + 1
				if (this.price > 500) {
					uni.showToast({
						icon: 'none',
						title: '价格不能再高啦'
					})
					this.price = 500
				}
			},
			checkWeight () {
				if (this.weight <= 0) {
					uni.showToast({
						icon: 'none',
						title: '重量不能再小啦'
					})
					this.weight = 1
				}
			},
			checkPrice () {
				if (this.price <= 0) {
					uni.showToast({
						icon: 'none',
						title: '价格不能再低啦'
					})
					this.price = 1
				}
				if (this.price > 500) {
					uni.showToast({
						icon: 'none',
						title: '价格不能再高啦'
					})
					this.price = 500
				}
			},
			//确定
			goBack () {
				if (this.shopInfoMain === '' && this.elseShop.trim() === '') {
					uni.showToast({
						icon: 'none',
						title: '请确认您的商品类型'
					})
					return
				}
				
				if (this.price > 500) {
					uni.showToast({
						icon: 'none',
						title: '商品预估价最高500元'
					})
					this.price = 500
					return
				}

				
				//其他
			
				if (this.showElse) {
					// let shopInfo = {}
					if (this.elseShop == "") {
						uni.showToast({
							icon: 'none',
							title: '请填写其他商品类型'
						})
						return
					}
					
					this.shopInfo.main = this.elseShop
					this.shopInfo.weight = this.weight
					this.shopInfo.price = this.price
					this.shopInfo.status = 0
					uni.setStorageSync('shopInfo',this.shopInfo)
				} else {
					let shopInfo = {}
					this.shopInfo.main = this.shopInfoMain
					this.shopInfo.weight = this.weight
					this.shopInfo.price = this.price
					this.shopInfo.status = 1
					uni.setStorageSync('shopInfo',this.shopInfo)
				}
				
				uni.navigateBack({
					delta:1
				})
			},
			//商品列表
			async initGoodsInfo () {
				let res = await this.$fetch(this.$api.goodsType,{},"GET","Form")
				
				if (res.code == 0) {
					this.shopList = res.data
				} else {
					uni.showToast({
						icon:'none',
						title: res.msg
					})
				}
				
			},
			//点击其他
			choiceElese () {
				this.showElse = true
				this.currentIndex = -1
			}
		},
		watch:{
			// weight (value) {
			// 	if (value === 0) {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '重量不能再小啦'
			// 		})
			// 		this.weight = 1
			// 	}
			// },
			// price (value) {
			// 	if (value === 0) {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '价格不能再低啦'
			// 		})
			// 		this.price = 1
			// 	}
			// 	if (value > 500) { 
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '价格不能再高啦'
			// 		})
			// 		this.price = 500
			// 	}
			// } 
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.shop-info{
		.shop-header{
			width: 100%;
			// height: 440rpx;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			.header-title{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
			}
			.header-box{
				display: flex;
				flex-wrap: wrap;
				height: 100%;
				// width: 100%;
				// height: 220rpx;
				.header-item{
			
					width: 210rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px;
					border-radius: 4px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					margin-right: 30rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
					&:nth-child(3n){
						margin-right: 0;
						box-sizing: border-box;
					}
					&.on{
						background: #5468FF;
						color: #FFFFFF;
					}
				}
				.input-box{
					width: 450rpx;
					height: 80rpx;
					line-height: 80rpx;
					padding-left: 30rpx;
					margin-top: 30rpx;
					background: #F7F7FA;
					border-radius: 2px;
					border-radius: 2px;
					font-size: 14px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.header-input{
						
					}
				}
				
			}
		}
		.shop-middle{
			width: 100%;
			height: 152rpx;
			background-color: #fff;
			padding: 30rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.middle-left{
				.middle-title{
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #09023E;
					font-weight: bold;
				}
				.middle-tip{
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					margin-top: 10rpx;
					box-sizing: border-box;
				}
			}
			.middle-right{
				display: flex;
				.sub,.add{
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					// transform: scale(0.5);
					box-sizing: border-box;
					image{
						width: 100%;
						height: 100%;
						transform: scale(0.5)
					}
				}
				.sub{
					border-right: none;
					box-sizing: border-box;
				}
				.add{
					transform: scaleX(-1);
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					border-right: none;
					box-sizing: border-box;
				}
				.middle-center{
					width: 160rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px;
					border-radius: 0px;
					box-sizing: border-box;
					.middle-input{
						width: 68rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						box-sizing: border-box;
						
					}
					.middle-kilo{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
						box-sizing: border-box;
					}
				}
			}
		}
		.shop-footer{
			width: 100%;
			height: 152rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			.footer-left{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				font-weight: bold;
				text{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #5468ff;
					line-height: 24px;
				}
				.footer-left-botton{
					width: 302rpx ;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					letter-spacing: -0.34px;
					padding-bottom: 20rpx;
					box-sizing: border-box;
				}
			}
			.middle-right{
				display: flex;
				.sub,.add{
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					// transform: scale(0.5);
					box-sizing: border-box;
					image{
						width: 100%;
						height: 100%;
						transform: scale(0.5);
						box-sizing: border-box;
					}
				}
				.sub{
					border-right: none;
				}
				.add{
					transform: scaleX(-1);
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					border-right: none;
					box-sizing: border-box;
				}
				.middle-center{
					width: 160rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px;
					border-radius: 0px;
					box-sizing: border-box;
					.middle-input{
						width: 68rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						box-sizing: border-box;
					}
					.middle-kilo{
						width: 68rpx;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
						box-sizing: border-box;
					}
				}
			}
		}
		.shop-button{
			width: 100%;
			height: 90rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			text-align: center;
			line-height: 90rpx;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			box-sizing: border-box;
		}
	}
</style>
