<template>
	<div class="container">
		<div id="lcd" class="lcd"></div>
		<div id="youka" class="youka"></div>
		<div id="dlb" class="dlb"></div>
	</div>
</template>

<script>
	export default {
		name: 'instructions',
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
		height: 48.53rem;
		background: transparent url('../assets/instructions-bg.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		.lcd {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			height: 5rem;
		}
		.youka {
			position: absolute;
			width: 100%;
			top: 11.55rem;
			left: 0;
			height: 5rem;
		}
		.dlb {
			position: absolute;
			width: 100%;
			top: 21.6rem;
			left: 0;
			height: 5rem;
		}
	}
</style>