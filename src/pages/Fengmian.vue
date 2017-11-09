<template>
	<div class="container">
		<router-link class="dlb-link" to="/dlb"></router-link>
		<router-link class="youka-link" to="/youka"></router-link>
		<router-link class="lcd-link" to="/lcd"></router-link>
	</div>
</template>

<script>
	export default {
		name: 'fengmian',
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		width: 100%;
		height: 6.33rem;
		background: transparent url('../assets/fengmian.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		// 动力宝链接
		.dlb-link, .youka-link, .lcd-link {
			position: absolute;
			left: 1.47rem;
			top: 4.85rem;
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
	}
</style>