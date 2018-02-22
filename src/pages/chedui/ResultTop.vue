<template>
	<section class="container" @click="showNext">
		
	</section>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			showNext() {
				this.$router.push('resultbottom');
			}
		}
	}

</script>

<style lang="scss">
	.container {
		position: relative;
		width: 100%;
		height: 6.67rem;
		background: transparent url('../../assets/chedui-resulttop.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
	}
</style>