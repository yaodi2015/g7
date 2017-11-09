<!-- 油卡计算器 -->
<!-- 2017-10-20 -->

<template>
	<transition name="fade">
		<div v-if="pageType == 1" class="youka-cal-container">
			<!-- 油卡计算 -->
			<div class="firm-area">
				<div class="firm-type-container">
					<span @click="switch_type(1)" :class="{'firm-type-active': firmType === 1}">中石油</span>
					<em class="line"></em>
					<span @click="switch_type(2)" :class="{'firm-type-active': firmType === 2}">中石化</span>
				</div>
				<div  v-if="firmType === 2" class="shihua-input-area">
					<input type="tel" v-model="shihua_money" placeholder="每月单卡加油升数（单位：升）">
				</div>
				<div v-else class="shiyou-input-area">
					<div class="province-area">
						<select v-model="shiyou_province">
							<option value="">所在加油省份</option>
							<option value="neimenggu">内蒙古</option>
							<option value="liaoning">辽宁</option>
							<option value="jilin">吉林</option>
							<option value="heilongjiang">黑龙江</option>
							<option value="xinjiang">新疆</option>
							<option value="xizang">西藏</option>
							<option value="shanxi1">陕西</option>
							<option value="qinghai">青海</option>
							<option value="ningxia">宁夏</option>
							<option value="gansu">甘肃</option>
							<option value="tianjin">天津</option>
							<option value="shanxi2">山西</option>
							<option value="hebei">河北</option>
							<option value="beijing">北京</option>
							<option value="hunan">湖南</option>
							<option value="hubei">湖北</option>
							<option value="henan">河南</option>
							<option value="chongqing">重庆</option>
							<option value="yunnan">云南</option>
							<option value="sichuan">四川</option>
							<option value="guizhou">贵州</option>
							<option value="guangxi">广西</option>
							<option value="zhejiang">浙江</option>
							<option value="shanghai">上海</option>
							<option value="shandong">山东</option>
							<option value="jiangxi">江西</option>
							<option value="jiangsu">江苏</option>
							<option value="anhui">安徽</option>
							<option value="hainan">海南</option>
							<option value="guangdong">广东</option>
							<option value="fujian">福建</option>
						</select>
					</div>
					<div class="money-sum">
						<input type="tel" v-model="shiyou_money" placeholder="每月中石油消耗金额（单位：元）">
					</div>
				</div>
			</div>
			<div class="calculate-button-area">
				<button @click="calculate"></button>
			</div>
		</div>
		<div v-else-if="pageType == 2" class="shiyou-result-container">
			<!-- 中石油计算结果 -->
			<span class="back-btn" @click="back_act"><i class="arrow-back"></i>返回计算器</span>
			<div class="top-message">
				<p>您使用一路通中石油卡，</p>
				<p>每月消费<span>{{shiyou_money}}</span>元</p>
			</div>
			<div class="shiyou-reund-money">{{shiyou_refund_money}}</div>
			<p class="shiyou-fanlibi">加油返利 {{shiyou_fanlibi}}%</p>
			<a href="https://jinshuju.net/f/UsHWBu" class="apply-btn-area"></a>
		</div>
		<div v-else-if="pageType == 3" class="shihua-result-container">
			<!-- 中石化计算结果 -->
			<span class="back-btn" @click="back_act"><i class="arrow-back"></i>返回计算器</span>
			<div class="top-message">
				<p>您使用一路通中石化卡，</p>
				<p class="first-line">
					<span class="first-text">
						单卡每月加油
					</span>
					<span class="msg-money-sum">{{shihua_money}}</span>
					<span class="last-text">升</span>
				</p>
			</div>
			<div class="shihua-refund-score">{{shihua_refund_score}}</div>
			<div class="shihua-fanlibi">
				<p>可兑换人民币<span>{{shihua_refund_score}}</span>元</p>
				<p>返利 <span>{{shihua_fanlibili}}%</span></p>
			</div>
			<a href="https://jinshuju.net/f/UsHWBu" class="apply-btn-area"></a>
		</div>
	</transition>
</template>

<script>
	const conf = {
		neimenggu: 0.08,
		liaoning: 1,
		jilin: 0.38,
		heilongjiang: 0,
		xinjiang: 0.3,
		hubei: 1.7,
		henan: 2,
		chongqing: 1,
		yunnan: 1.2,
		sichuan: 0.9,
		guizhou: 1.2,
		xizang: 0,
		shanxi1: 0.5,
		qinghai: 0.38,
		ningxia: 0.08,
		gansu: 0,
		tianjin: 1.7,
		shanxi2: 0.7,
		hebei: 1.7,
		beijing: 2.5,
		hunan: 1.5,
		guangxi: 1.2,
		zhejiang: 2,
		shanghai: 1.35,
		shandong: 2,
		jiangxi: 1.2,
		jiangsu: 1.2,
		anhui: 0.5,
		hainan: 2.9,
		guangdong: 2.5,
		fujian: 3
	}
	export default {
		name: 'youka',
		data() {
			return {
				pageType: 1, //页面类型 1：油卡计算页，2：中石油结果页，3：中石化结果页
				firmType: 1, // 油厂类型 1：中石油，2：中石化
				shiyou_money: '',  // 中石油消费金额
				shiyou_province: '', //中石油选择省份
				shihua_money: '', // 中石化消费升数
				shiyou_refund_money: '', //中石油返利金额
				shihua_refund_score: '', // 中石化返还积分
				shiyou_fanlibi: '',  //中石油返利比
				shihua_fanlibili: '' //中石化返利比
			}
		},
		methods: {
			//计算方法
			calculate() {
				if (this.firmType == 1) {
					if (conf[this.shiyou_province] == undefined) {
						return alert('请选择省份');
					}
					// 中石油计算公式，返利金额
					this.shiyou_refund_money = this.shiyou_money * conf[this.shiyou_province] * 0.01;
					this.shiyou_refund_money = this.shiyou_refund_money.toFixed(2);
					
					// 显示中石油计算结果
					this.shiyou_fanlibi = conf[this.shiyou_province];
					this.pageType = 2;
					window.scrollTo(0, 0);
				} else if(this.firmType == 2) {
					// 中石化计算公式
					const jidu_v = this.shihua_money * 3;
					// 油价
					const youjia = 5.5;
					if (jidu_v <= 1000) {
						this.shihua_refund_score = jidu_v * 2 * 0.01;
					} else if (jidu_v <= 2000) {
						this.shihua_refund_score = 1000 * 2 * 0.01 + (jidu_v - 1000) * 0.04;
					} else if (jidu_v <= 3000) {
						this.shihua_refund_score = 1000 * 0.02 + 1000 * 0.04 + (jidu_v - 2000) * 0.06;
					} else if (jidu_v <= 5000) {
						this.shihua_refund_score = 1000 * 0.02 + 1000 * 0.04 + 1000 * 0.06 + (jidu_v - 3000) * 0.08;
					} else {
						// 5000以上
						this.shihua_refund_score = 1000 *  0.02 + 1000 * 0.04 + 1000 * 0.06 + 2000 * 0.08 + (jidu_v - 5000) * 0.1;
					} 
					this.shihua_refund_score = Math.round(this.shihua_refund_score * youjia);
					this.shihua_fanlibili = this.shihua_refund_score / jidu_v / youjia * 100;
					this.shihua_fanlibili = this.shihua_fanlibili.toFixed(2);
					// 显示中石化计算结果
					
					this.pageType = 3;
					window.scrollTo(0, 0);
				}
			},
			// 中石油中石化选项卡切换
			switch_type(type) {
				this.firmType = type;
			},
			//返回按钮
			back_act() {
				this.pageType = 1;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.youka-cal-container {
		position: relative;
		width: 100%;
		height: 6.33rem;
		background: transparent url('../assets/youka-background2.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		// 油商选择
		.firm-area {
			position: absolute;
			left: 0;
			top: 4.39rem;
			width: 100%;
			padding: 0 .46rem 0 .4rem;
			// 选择油商
			.firm-type-container {
				height: .35rem;
				// border-bottom:  1px solid #87be2d;
				// padding: 0 .22rem;
				span {
					color: #989898;
					font-size: .17rem;
					border-bottom: 4px solid #b5b5b5;
					&.firm-type-active {
						border-bottom: 4px solid #b3d465;
					}
					
				}
				//竖线
				.line {
					height: .2rem;
					width: 0;
					margin: 0 12px 0 10px;
					border: 1px solid #989898;
				}
			}
			// 中石化输入
			.shihua-input-area {
				// display: none;
				height: .94rem;
				// border-bottom:  1px solid #87be2d;
				// padding: 0 .22rem;
				font-size: .13rem;	
				color: #989898;
				input {
					margin-top: .25rem;
					border: none;
					border-radius: 5px;
					background: #d3d3d3;
					width: 100%;
					padding: 0 .1rem;
					height: .28rem;
				}
			}
			// 中石油输入区域
			.shiyou-input-area {
				.province-area {
					height: .28rem;
					margin-top: .1rem;
					// padding: 0 .22rem;
					font-size: .13rem;	
					color: #888888;
					select {
						color: #888888;
						height: 100%;
						width: 100%;
						padding: 0 .1rem;
						border: none;
						border-radius: 5px;
						background: #d3d3d3;
					}
				}
				.money-sum {
					margin-top: .15rem;
					height: .28rem;
					// border-bottom:  1px solid #87be2d;
					// padding: 0 .22rem;
					font-size: .13rem;	
					color: #888888;
					input {
						border: none;
						padding: 0 .1rem;
						width: 100%;
						height: 100%;
						border-radius: 5px;
						background: #d3d3d3;
					}
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
	.shiyou-result-container {
		position: relative;
		width: 100%;
		height: 6.33rem;
		background: transparent url('../assets/shiyou-result.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		.top-message {
			position: absolute;
			left: 0;
			top: .63rem;
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: .17rem;
			letter-spacing: .02rem;
			p:nth-child(2) {
				margin: .05rem 0 0;
			}
			span {
				color: #ffff00;
			}
		}
		// 返利金额
		.shiyou-reund-money {
			position: absolute;
			left: 0;
			top: 2.4rem;
			width: 100%;
			color: #ffff00;
			font-size: .3rem;
			text-align: center;
			font-weight: bold;
		}
		.shiyou-fanlibi {
			position: absolute;
			left: 0;
			top: 4.3rem;
			width: 100%;
			color: #fff;
			font-size: .13rem;
			text-align: center;
			letter-spacing: .02rem;
		}
	}
	.shihua-result-container {
		position: relative;
		width: 100%;
		height: 6.33rem;
		background: transparent url('../assets/shihua-result2.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
		.top-message {
			position: absolute;
			width: 100%;
			top: .61rem;
			left: 0;
			
			p {
				text-align: center;
				color: #fff;
				font-size: .17rem;
				line-height: .27rem;
				
				letter-spacing: .025rem;
				
			}
			.first-line {
				top: .4rem;
				height: .3rem;
			}
			.first-text {
				position: absolute;
				top: .4rem;
				right: 2rem;
				width: 100%;
				text-align: right;
			}
			.last-text {
				position: absolute;
				top: .4rem;
				left: 2.95rem;
			}
			.msg-money-sum {
				position: absolute;
				left: 1.87rem;
				top: .4rem;
				display: inline-block;
				font-size: .17rem;
				color: #449b3b;
				width: 1rem;
				font-weight: bold;
			}
			
		}
		// 中石化返利积分
		.shihua-refund-score {
			position: absolute;
			left: 0;
			top: 2.4rem;
			width: 100%;
			color: #ffff00;
			font-size: .36rem;
			text-align: center;
		}
		.shihua-fanlibi {
			position: absolute;
			left: 0;
			top: 4.3rem;
			width: 100%;
			p {
				color: #fff;
				font-size: .13rem;
				line-height: .2rem;
				height: .25rem;
				letter-spacing: .02rem;
				span {
					color: #ffff00;
				}
			}
			
			text-align: center;
		}
	}
	// 立即申请
	.apply-btn-area {
		position: absolute;
		left: 1.14rem;
		top: 5.59rem;
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
	// 动画
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	  opacity: 0
	}
</style>