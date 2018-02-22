<template>
	<div class="container" >
		<img src="../assets/heka-1v1.png" />
		<span class="btn" @click="$router.push('/heka')">开始定制</span>
		<!-- 音效音频 -->
		<audio src="/static/tassel.mp3" ref="music" loop autoplay>
		</audio>
	</div>
</template>
<script>
	export default {
		mounted() {
			this.$refs.music.play();
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		position: relative;
		img {
			width: 100%;
			vertical-align: bottom;
		}
		.btn {
			position: absolute;
			top: 5rem;
			left: 1.1rem;
			font-size: 0;
			width: 1.57rem;
			height: .47rem;

			animation: scale-btn 2s infinite;
			background: transparent url('../assets/heka-index-btn.png') 0 0 no-repeat;
			background-size: 100%;

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
	}
</style>