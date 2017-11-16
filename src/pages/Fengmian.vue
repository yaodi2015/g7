<template>
	<div class="container">
		<router-link class="dlb-link" to="/dlb"></router-link>
		<router-link class="youka-link" to="/youka"></router-link>
		<router-link class="lcd-link" to="/lcd"></router-link>
		<router-link class="dlb-instruct" to="/instruct#dlb"></router-link>
		<router-link class="youka-instruct" to="/instruct#youka"></router-link>
		<router-link class="lcd-instruct" to="/instruct#lcd"></router-link>
		<div class="instruct-cakes" @click="scrollToInstruct"></div>
	</div>
</template>

<script>
	export default {
		name: 'fengmian',
		data() {
			return {

			}
		},
		methods: {
			scrollToInstruct() {
				window.scrollTo(0, 100000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		width: 100%;
		height: 7.24rem;
		background: transparent url('../assets/fengmianv3.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		// 动力宝链接
		.dlb-link, .youka-link, .lcd-link {
			position: absolute;
			left: 1.47rem;
			top: 4.33rem;
			display: block;
			width: .84rem;
			height: .84rem;
		}
		.youka-link {
			left: .17rem;
		}
		.lcd-link {
			left: 2.79rem;
		}
		// 申请资料须知
		.dlb-instruct, .youka-instruct, .lcd-instruct {
			position: absolute;
			left: 1.47rem;
			top: 6.06rem;
			display: block;
			width: .84rem;
			height: .84rem;
		}
		.youka-instruct {
			left: .17rem;
		}
		.lcd-instruct {
			left: 2.79rem;
		}
		// 申请资料须知
		.instruct-cakes {
			position: absolute;
			left: 2.4rem;
			top: 5.4rem;
			display: block;
			width: .34rem;
			height: .24rem;
		}
	}
</style>