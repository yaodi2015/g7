<!-- 贺卡 -->
<template>
	<div>
		<div v-if="buildStatus == 1" class="heka-img-container" ref="hekaContent">
			<img class="heka-img" src="../assets/heka-2v2.png">
			<div class="youpiao" ref="youpiaoBox">
				<img ref="youpiao" class="you-piao-img"  src="../assets/heka-youpiao.png" />
			</div>
			<input type="text" class="city ipt" value="城市" />
			<input type="text" class="name ipt" value="姓名" />
			<input type="tel"class="tel ipt" value="电话号码" />
			<span class="arrow-tips"></span>
			<span ref="span" @click="transfer" class="transfer-btn">生成贺卡</span>

		</div>
		<div v-if="showLoading" class="loading">
			<p class="tips-text">正在制作<span class="text-eclips">...</span></p>
		</div>
		<div v-show="buildStatus == 2" class="canvas-body">
			<div ref="canvasBody" >
			</div>
			<span class="tips-tag" >长按图片保存，发给爱的人</span>
			<span class="back-btn-container" @click="$router.go(-1)">
				返回
			</span>
		</div>
		<!-- 音效音频 -->
		<audio src="/static/tassel.mp3" ref="music" loop autoplay>
		</audio>
	</div>
</template>

<script>
	
	import html2canvas from 'html2canvas'
	export default {
		data() {
			return {
				buildStatus: 1, // 1 -> 2.loading -> 3. 制作完成
				showLoading: false,
			}
		},
		methods: {
			transfer() {
				this.showLoading = true
				
				// 去掉制作按钮
				this.$refs.span.remove()
				this.$refs.youpiao.remove()
				// 替换邮票
				var image = document.createElement('img');
				// image.src = qrcode;
				image.src = '/static/heka-qrcode.png';
				image.setAttribute('width', '100%')

				this.$refs.youpiao.remove()
				this.$refs.youpiaoBox.appendChild(image)
				
				window.scrollTo(0, 0)
				html2canvas(this.$refs.hekaContent, {
					useCORS: true,
					allowTaint: true,
				})
				.then(canvas => {
				    this.canvasImage(canvas)
				});
				
			},
			canvasImage: function(canvas){
	 			
 				var imgURI = canvas.toDataURL('image/png');
 				
 				var image = document.createElement('img');
 				image.src = imgURI
 				image.setAttribute('width', '100%')
 				this.$refs.canvasBody.appendChild(image)
 				
 				this.showLoading = false
 				this.buildStatus = 2
 			}
		},
		mounted() {
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.heka-img-container {
		position: relative;
		width: 100%;
		.heka-img {
			width: 100%;
			vertical-align: bottom;
		}
		.ipt {
			position: absolute;
			top: 0;
			color: #000;
			text-align: center;
			border: none;
			background: transparent;
			// 输入框
			&.date {
				top: 2.71rem;
				left: 0.68rem;
				width: 0.14rem;
				height: 0.12rem;
				line-height: 0.12rem;
				// color: #000;

			}
			&.city {
				top: 3.65rem;
				left: 1.37rem;
				width: .42rem;
				height: .29rem;
				line-height: .29rem;
				
			}
			&.name {
				top: 3.65rem;
				left: 2.05rem;
				width: .7rem;
				height: .29rem;
				line-height: .29rem;
			}
			&.tel {
				top: 4.23rem;
				left: 1.36rem;
				width: 1.3rem;
				height: .29rem;
				line-height: 0.29rem;
			}

		}
		// 指示箭头
		.arrow-tips {
			position: absolute;
			font-size: 0;
			top: 2.56rem;
			left: 0.63rem;
			height: 0.24rem;
			width: 0.24rem;
			background: transparent url('../assets/heka-arrow.png') 0 0 no-repeat;
			background-size: 100%;
			animation: scale-arrow 2s infinite;
		}

	}
	// 邮票
	.youpiao {
		position: absolute;
		right: 0.25rem;
		top: .25rem;
		width: 1.03rem;
		height: 1.04rem;
		img {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
		}
		.qrcode-img {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 0;
		}
	}
	// 制作按钮
	.transfer-btn {
		position: absolute;
		font-size: 0;
		top: 5rem;
		left: 1.25rem;
		height: 0.47rem;
		width: 1.19rem;
		background: transparent url('../assets/heka-create-btn.png') 0 0 no-repeat;
		background-size: 100%;
		animation: scale-btn 2s infinite;
	}
	// 结果页
	.canvas-body {
		position: relative;
		// 生成的图片置底
		img {
			width: 100%;
			vertical-align: bottom;
		}
		// 返回上一页
		.back-btn-container {
			position: absolute;
			font-size: 0;
			top: 5.3rem;
			left: 2.7rem;
			height: 0.4rem;
			width: 0.83rem;
			background: transparent url('../assets/heka-back-btn.png') 0 0 no-repeat;
			background-size: 100%;
			
		}
		// 长按发给爱的人
		.tips-tag {
			position: absolute;
			font-size: 0;
			top: 5.3rem;
			left: 0.13rem;
			height: 0.41rem;
			width: 2rem;
			background: transparent url('../assets/heka-tips-tag.png') 0 0 no-repeat;
			background-size: 100%;
			animation: scale-btn 2s infinite;
		}
		@keyframes scale-btn {
		    0% {
				transform: scale(1)
		    }
		    50% {
				transform: scale(0.95)
		    }
		    100% {
				transform: scale(1)
		    }
		}
		@keyframes scale-arrow {
		    0% {
				transform: scale(1)
		    }
		    50% {
				transform: scale(0.9)
		    }
		    100% {
				transform: scale(1)
		    }
		}
	}
	
	// loading 页面
	.loading {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
		color: #fff;
		text-align: center;
		vertical-align: middle;
		.tips-text {
			text-align: center;
			line-height: 100vh;
			font-size: 20px;
			.text-eclips {
				margin: 0 .05rem;
				letter-spacing: .05rem;
				animation: scale-eclips 2s infinite;
			}
		}
	}
	@keyframes scale-eclips {
	    0% {
			opacity: 1;
	    }
	    50% {
			opacity: 0;
	    }
	    100% {
			opacity: 1;
	    }
	}
</style>