<!-- 里程贷计算器 -->
<!-- 2017-10-21 -->

<template>
	<transition name="fade">
		<div v-if="pageType === 1" class="lichengdai-cal-container">
			<div class="input-area">
				<div class="radio-wrap">
					<span :class="{'selected': time_type === 1}" @click="switch_type(1)"></span>
					<span :class="{'selected': time_type === 2}" @click="switch_type(2)"></span>
					<span :class="{'selected': time_type === 3}" @click="switch_type(3)"></span>
				</div>
				<div class="input-wrap">
					<input type="tel" v-model="money_sum" placeholder="最高不超过50万">
				</div>
				
			</div>
			<div class="calculate-button-area">
				<button @click="calculate"></button>
			</div>
		</div>
		<!-- 结果页 -->
		<div v-if="pageType === 2" class="lichengdai-result-container">
			<span class="back-btn" @click="back_act"><i class="arrow-back"></i>返回计算器</span>
			<div class="top-message">
				<p class="first-line">
					<span class="first-text">
						您贷款
					</span>
					<span class="msg-money-sum">{{money_sum}}</span>
					<span class="last-text">元</span>
				</p>
				<p class="second-line">
					贷款<span>{{days}}</span>天
				</p>
			</div>
			<div class="get-money">{{get_money}}</div>
			<div class="refund-money">
				<p>应还总额</p>
				<p><span>{{refund_money}}</span> 元</p>
			</div>
			<a href="https://jinshuju.net/f/ZXovPK" class="apply-btn-area"></a>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'youka',
		data() {
			return {
				pageType: 1, //页面类型 1：计算页，2：结果页
				money_sum: '',  // 贷款总额
				time_type: 1, // 贷款期限 1：30天，2：44天，3：60天
				days: '', // 贷款天数
				get_money: '', // 实际到账金额
				refund_money: '' //应还总额
			}
		},
		methods: {
			//计算方法
			calculate() {
				if (this.money_sum == 0 || this.money_sum > 500000) {
					return window.alert('最高不超过50万');
				}
				let shouxufei = 0,
					lilv = 0,
					days = 0;
				if (this.time_type === 1) {
					shouxufei = 0.0096;
					lilv = 0.065;
					days = 30;
				} else if (this.time_type === 2) {
					shouxufei = 0.0144;
					lilv = 0.065;
					days = 44;
				} else if (this.time_type === 3) {
					shouxufei = 0.0183;
					lilv = 0.07;
					days = 60;
				}
				this.get_money = this.money_sum - this.money_sum * shouxufei;
				this.refund_money = this.money_sum * 1 + this.money_sum * lilv / 360 * days;
				this.get_money = Math.round(this.get_money);
				this.refund_money = this.refund_money.toFixed(2);
				// 显示结果
				this.days = days;
				this.pageType = 2;
				window.scrollTo(0, 0);
			},
			// 贷款期限选择
			switch_type(type) {
				this.time_type = type;
			},
			//返回按钮
			back_act() {
				this.pageType = 1;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.lichengdai-cal-container {
		position: relative;
		width: 100%;
		height: 6.67rem;
		background: #fff url('../assets/lichengdai-background.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		// 贷款期限和贷款金额
		.input-area {
			position: absolute;
			left: 0;
			top: 4.89rem;
			width: 100%;
			padding: 0 .12rem;
			// 贷款期限
			.radio-wrap {
				position: relative;
				height: .35rem;
				span {
					position: absolute;
					top: .12rem;
					display: block;
					width: .13rem;
					height: .13rem;
					&:nth-child(1) {
						left: 1.05rem;
					}
					&:nth-child(2) {
						left: 1.83rem;
					}
					&:nth-child(3) {
						left: 2.6rem;
					}
					&.selected {
						background: transparent url('../assets/lcd-icon.png') 0 0 no-repeat;
						background-size: 100% 100%;
					}
				}
			}
			.input-wrap {
				height: .7rem;
				padding: 0 .22rem;
				font-size: .16rem;	
				color: #888888;
				input {
					margin: .35rem 0 0;
					display: block;
					height: .3rem;
					padding: 0 .2rem;
					border: none;
					background: none;
					width: 100%;
				}
			}
			
		}
		// 点击计算按钮
		.calculate-button-area {
			position: absolute;
			left: 0.14rem;
			top: 5.96rem;
			width: 3.5rem;
			height: .35rem;
			button {
				border: none;
				background: none;
				height: 100%;
				width: 100%;
			}
		}
	}
	.lichengdai-result-container {
		position: relative;
		width: 100%;
		height: 6.33rem;
		background: transparent url('../assets/lichengdai-result2.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		.top-message {
			position: absolute;
			width: 100%;
			top: .63rem;
			left: 0;
			
			p {
				text-align: center;
				color: #fff;
				font-size: .17rem;
				line-height: .27rem;
				
				letter-spacing: .025rem;
				
			}
			.first-line {
				height: .3rem;
			}
			.first-text {
				position: absolute;
				top: 0;
				right: 2.29rem;
				width: 100%;
				text-align: right;
			}
			.last-text {
				position: absolute;
				top: 0;
				left: 2.65rem;
			}
			.msg-money-sum {
				position: absolute;
				left: 1.53rem;
				top: 0;
				display: inline-block;
				font-size: .17rem;
				color: #4a1c91;
				width: 1rem;
				font-weight: bold;
			}
			.second-line {
				top: .23rem;
				span {
					color: #ffff00;
				}
			}
		}
		// 返利金额
		.get-money {
			position: absolute;
			left: 0;
			top: 2.35rem;
			width: 100%;
			color: #ffff00;
			font-size: .36rem;
			text-align: center;
		}
		.refund-money {
			position: absolute;
			left: 0;
			top: 4.22rem;
			width: 100%;
			color: #ffff00;
			font-size: .17rem;
			text-align: center;

			p {
				color: #fff;
				// font-size: .17rem;
				line-height: .2rem;
				height: .28rem;
				letter-spacing: .02rem;
				span {
					color: #ffff00;
				}
			}
			
		}
		// 立即申请
		.apply-btn-area {
			position: absolute;
			left: 1.14rem;
			top: 5.64rem;
			display: block;
			width: 1.49rem;
			height: .32rem;
		}
		// 返回按钮
		.back-btn {
			position: absolute;
			color: #fff;
			left: .15rem;
			top: .15rem;
			padding: 0 .1rem;
			line-height: .2rem;
			.arrow-back {
				line-height: .2rem;
				height: 10px;
				width: 10px;
				display : inline-block;
				border-color:#fff #fff transparent transparent;
				border-style:solid solid dashed dashed;
				border-width:1px;
				-webkit-transform: rotate(-135deg);
				-moz-transform: rotate(-135deg);
				transform: rotate(-135deg);
			}
		}
	}
	
	// 动画
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	  opacity: 0
	}
</style>