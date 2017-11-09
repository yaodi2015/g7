<!-- 动力宝计算器 -->
<!-- 2017-10-20 -->

<template>
	<transition name="fade">
		<!-- 计算页 -->
		<div v-if="page_type === 1" class="dlb-calculator-container">
			<div class="input-wrap money-sum">
				<input type="tel" v-model="money_sum" placeholder="不超过300万">
			</div>
			<div class="input-wrap get-money-day">
				<input type="tel" v-model="getmoney_day" placeholder="请输入本月第几天">
			</div>
			<div class="radio-wrap month-type">
				<span :class="{'selected': month_type === 1}" @click="switch_type(1)"></span>
				<span :class="{'selected': month_type === 2}" @click="switch_type(2)"></span>
			</div>
			<div class="input-wrap month-day"
				 v-if="month_type === 1">
				<p>本月第几天还款</p>
				<input type="tel" v-model="benyue_day" placeholder="还款日需超过提款日至少5天">
			</div>
			<div class="input-wrap month-day" v-else>
				<p>下月第几天还款</p>
				<input type="tel" v-model="xiayue_day" placeholder="还款日需超过提款日至少5天">
			</div>
			<div class="button-wrap">
				<button @click="calculate_act"></button>
				<div :class="['error-area', error_message == '' ? '' : 'show']">{{error_message}}</div>
			</div>
		</div>
		<!-- 结果页 -->
		<div v-else class="calculate-result-container">
			<span class="back-btn" @click="back_act"><i class="arrow-back"></i>返回计算器</span>
			<div class="top-message">
				<p class="first-line">
					<span class="first-text">
						您本月第{{getmoney_day}}天贷款
					</span>
					<span class="msg-money-sum">{{money_sum}}</span>
					<span class="last-text">元，</span>
				</p>
				<p class="second-line">
					<template v-if="month_type === 1">
						并于本月第{{benyue_day}}天还款
					</template>
					<template v-else>
						并于下月第{{xiayue_day}}天还款
					</template>
				</p>
			</div>
			<p class="lixi-sum">
				{{lixi_sum}}
			</p>
			<div class="lilv-area">
				<p>适用计息标准</p>
				<p>{{rixi}}</p>
			</div>
			<a href="https://jinshuju.net/f/6iI6zw" class="apply-btn-area"></a>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'donglibao',
		data() {
			return {
				money_sum: '', //贷款金额 不超过300万
				month_type: 1, //月  1：本月 2：下月
				getmoney_day: '', // 本月第几天提用贷款
				benyue_day: '', //本月第几天
				xiayue_day: '', //下月第几天
				error_message: '', //错误提示
				lixi_sum: '',   //利息金额
				rixi: '',  //日息
				page_type: 1  //页面类型 1：计算页 2：结果页
				
			}
		},
		methods: {
			
			//马上申请
			calculate_act() {
				// 重置错误信息
				this.error_message = '';
				//type为tel，限制输入只能是正整数和0
				if (this.money_sum <= 0) {
					return this.error_message ="请输入大于0的贷款金额";
				}
				if (this.money_sum > 3000000) {
					return this.error_message ="贷款金额不超过300万";
				}

				if (this.getmoney_day <= 0) {
					return this.error_message ="请输入大于0的贷款时间";
				}
				
				if (this.getmoney_day > 30) {
					return this.error_message ="贷款日期小于30";
				}
				
				if (this.month_type === 1 && this.benyue_day <= 0) {
					
						this.error_message ="请输入大于0的贷款时间";
						return false;
				}
				if (this.month_type === 1 && this.benyue_day > 30) {
						this.error_message ="本月还款日期不超过30";
						return false;
				}

				if (this.month_type === 1 && this.benyue_day < this.getmoney_day*1 + 5) {
						this.error_message ="还款日需超过提款日至少5天";
						return false;
				}
				
				if (this.month_type === 2 && this.xiayue_day <= 0) {
						return this.error_message ="还款日期必须大于0";
				}
				if (this.month_type === 2 && this.xiayue_day > 31) {
						this.error_message ="下月还款日期不超过31";
						return false;
				}
				if (this.month_type === 2 && (this.xiayue_day*1 + (30 - this.getmoney_day)*1)< 5 ) {
						return this.error_message ="还款日需超过提款日至少5天";
				}

				//计算利息标准 和 利息总额
				let days;  //还款时间
				if (this.month_type === 1) {
					days = this.benyue_day - this.getmoney_day;
					this.rixi = '每日万分之五';
					this.lixi_sum = (this.money_sum * days * 0.05 * 0.01).toFixed(2);

				} else if(this.month_type === 2) {
					days = 30 - this.getmoney_day + this.xiayue_day * 1;
					if (this.xiayue_day <= 15) {
						this.rixi = '每日万分之五';
						this.lixi_sum = (this.money_sum * days * 0.05 * 0.01).toFixed(2);
					} else {
						this.rixi = '每日万分之五 + 逾期罚息每日千分之一';
						this.lixi_sum = (this.money_sum *days * 0.05 * 0.01 + this.money_sum * 0.1 * 0.01 * (this.xiayue_day - 15)).toFixed(2);
					}
				} else {
					this.error_message = '出错了..';
					return;
				}
				
				// 显示结果页
				this.page_type = 2;
				window.scrollTo(0, 0);
			},
			//返回按钮
			back_act() {
				this.page_type = 1;
			},
			// 月份选择
			switch_type(type) {
				this.month_type = type;
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	
	// 计算页面
	.dlb-calculator-container {
		width: 100%;
		height: 6.33rem;
		background: #dbdbd8 url('../assets/dlb-background.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.input-wrap {
		input {
			width: 100%;
			height: 100%;
			border: none;
			background: none;
			color: #888888;
			padding: 0 .05rem;
			font-size: .13rem;
		}
	}
	
	.money-sum {
		position: absolute;
		left: 0;
		top: 3.3rem;
		width: 100%;
		height: .28rem;
		padding: 0 .44rem;
	}
	.get-money-day {
		position: absolute;
		left: 0;
		top: 4.05rem;
		width: 100%;
		height: .28rem;
		padding: 0 .44rem;
	}
	.month-type {
		span {
			position: absolute;
			top: 4.58rem;
			display: block;
			width: .13rem;
			height: .13rem;
			&:nth-child(1) {
				left: 1.62rem;
			}
			&:nth-child(2) {
				left: 2.41rem;
			}
			
			&.selected {
				background: transparent url('../assets/lcd-icon.png') 0 0 no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.month-day {
		position: absolute;
		left: 0;
		top: 4.94rem;
		width: 100%;
		padding: 0 .44rem;
		p {
			color: #878787;
			font-size: .13rem;
		}
		input {
			width: 100%;
			height: .3rem;
			border: none;
			background: none;
			color: #888;
			font-size: .13rem;
			margin: .04rem 0 0;
		}

	}
	.button-wrap {
		position: absolute;
		left: 0;
		top: 5.73rem;
		width: 100%;
		padding: 0 .44rem;
		height: .3rem;
		button {
			border: none;
			background: none;
			height: 100%;
			width: 100%;
		}
	}
	// 错误提示
	.error-area {
		color: red;
		font-size: .13rem;
	}
	
	// 计算结果页面
	.calculate-result-container {
		position: relative;
		width: 100%;
		height: 6.33rem;
		background: transparent url('../assets/dlb-jieguo.jpg') 0 0 no-repeat;
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
				right: 1.79rem;
				width: 100%;
				text-align: right;
			}
			.last-text {
				position: absolute;
				top: 0;
				left: 3.06rem;
			}
			.msg-money-sum {
				position: absolute;
				left: 2rem;
				top: 0;
				display: inline-block;
				font-size: .17rem;
				color: #4a1c91;
				width: 1rem;
				font-weight: bold;
			}
			.second-line {
				top: .23rem;
			}
		}
		.lixi-sum {
			position: absolute;
			left: 0;
			top: 2.3rem;
			width: 100%;
			color: #ffff00;
			font-size: .37rem;
			font-weight: bold;
			text-align: center;
		}
		.lilv-area {
			position: absolute;
			left: 0;
			top: 4.33rem;
			width: 100%;
			p {
				color: #fff;
				font-size: .13rem;
				line-height: .2rem;
				height: .25rem;
				letter-spacing: .02rem;
				&:nth-child(2) {
					color: #ffff00;
				}
			}
			
			text-align: center;
		}
		// 立即申请
		.apply-btn-area {
			position: absolute;
			left: 1.15rem;
			top: 5.63rem;
			display: block;
			width: 1.46rem;
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