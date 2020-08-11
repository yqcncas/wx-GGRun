<template>
	<view class="explain">
		<view class="explain-header">
			<video :src="videoSrc" controls></video>
		</view>
		<view class="explain-bottom">
			<view class="explain-bottom-header">点击以上视频即可开始播放，横屏播放效果更佳</view>
			<view class="explain-bottom-footer">
				<view class="explain-bottom-footer-top">如何安装APP</view>
				<view class="explain-bottom-footer-item">1.截屏二维码至相册本</view>
				<view class="explain-bottom-footer-item">2.使用微信扫一扫相册本中的二维码</view>
				<view class="explain-bottom-footer-item">3.按照提示安装GG来送APP</view>
			</view>
		</view>
	</view>
</template>

<script>
	import baseURL from '@/config'
	export default {
		onLoad () {
			this.initVideo()
		},
		data () {
			return {
				videoSrc: ''
			}
		},
		methods: {
			async initVideo () {
				let res = await this.$fetch(this.$api.getVideo)
		
				 this.videoSrc = baseURL.slice(0, baseURL.length - 1) +  res.data
				 console.log(this.videoSrc)
			}
		}
	}
</script>

<style lang="less">
	.explain{
		.explain-header{
			width: 100%;
			height: 434rpx;
			video{
				width: 100%;
				height: 100%;
			}
		}
		.explain-bottom{
			padding: 30rpx;
			padding-top: 22rpx;
			box-sizing: border-box;
			.explain-bottom-header{
				font-family: PingFangSC-Regular;
				font-size: 17px;
				color: #09023E;
				padding-bottom: 60rpx;
				box-sizing: border-box;
			}
			.explain-bottom-footer{
				background: #FFFFFF;
				border: 1px solid rgba(9,2,62,0.10);
				border-radius: 4px;
				box-sizing: border-box;
				padding: 30rpx;
				box-sizing: border-box;
				.explain-bottom-footer-top{
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #09023E;
					font-weight: bold;
					padding-bottom: 24rpx;
					box-sizing: border-box;
				}
				.explain-bottom-footer-item{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.60);
				}
			}
		}
	}
</style>
