<template>
	<section class="container">
		<header class="header">
			<p>请输入您车队的基本指标</p>
			<p>G7大数据将为您计算</p>
		</header>
		<main class="main-box">
			<div class="input-wrap">
				<input type="number" v-model="cart_num" placeholder="自营车辆数">
				<span>辆</span>
			</div>
			<div class="input-wrap">
				<select v-model="cart_power">
					<option value="">车辆马力</option>}
					<option value="100-200马力">100-200马力</option>
					<option value="200-300马力">200-300马力</option>
					<option value="300-400马力">300-400马力</option>
					<option value="400-500马力">400-500马力</option>
					<option value="500马力以上">500马力以上</option>
				</select>
			</div>
			<div class="input-wrap">
				<select v-model="cart_type">
					<option value="">车辆类型</option>}
					<option value="国产">国产</option>
					<option value="进口">进口</option>
				</select>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="tolls_per_month" placeholder="每月过路费金额">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="miles_per_month" placeholder="单车月均公里数">
				<span>公里</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="oil_per_month" placeholder="单车月均百公里油耗">
				<span>L/百公里</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="l_per_month" placeholder="单车月均加油升数">
				<span>L</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="amount_per_month" placeholder="每月加油充值金额">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="oil_price" placeholder="加油价格">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="g7_credit_line" placeholder="G7授信额度">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="g7_water_month" placeholder="G7授信月均流水">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="non_g7_credit_line" placeholder="每月非G7授信金额">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="non_g7_rate" placeholder="非G7授信月利率">
				<span>元</span>
			</div>
			<div class="input-wrap">
				<input type="number" v-model="funding_gap" placeholder="目前流动资金缺口">
				<span>元</span>
			</div>
		</main>
		<div class="btn-wrap">
			<span @click="calculate">立即测算</span>
		</div>
	</section>
</template>

<script>
	// 系统最佳油耗字典 
	const dict = {
		"100-200马力": {
			"国产": 26,
			"进口": 25
		},
		"200-300马力": {
			"国产": 29,
			"进口": 28
		},
		"300-400马力": {
			"国产": 31,
			"进口": 30
		},
		"400-500马力": {
			"国产": 35,
			"进口": 31
		},
		"500马力以上": {
			"国产": 35,
			"进口": 32
		}
	};

	export default {
		data() {
			return {
				cart_num: '', // 自营车辆数
				cart_power: '', // 车辆马力 
				cart_type: '', // 车辆类型 
				miles_per_month: '', // 单车月均公里数 范围值为1-50万公里
				oil_per_month: '', // 单车月均百公里油耗
				l_per_month: '', // 单车月均加油升数
				amount_per_month: '', // 每月油卡消费金额
				tolls_per_month: '', // 每月过路费
				oil_price: '', // 加油价格
				g7_credit_line: '', // G7授信额度
				g7_water_month: '', // G7授信月均流水
				non_g7_credit_line: '', // 每月非G7授信金额
				non_g7_rate: '', // 非G7授信月利率
				funding_gap: '', // 目前流动资金缺口
			}
		},
		methods: {
			// 立即测算
			calculate() {
				let best_oil_use, // 系统最佳油耗
					shihua_fanli, // 石化返利
					diff_oil, // 单车油耗差值
					loss_oil, // 每年损失油费
					loss_interest, // 每年利息损失
					loss_account_time, // 每年算账耗时
					loss_ticket_time, // 每年贴票耗时
					// 结果页2
					refueling_line, // 垫资加油额度
					yilutong_line, // 一路通额度
					save_time, // 节约工时
					save_money, // 节约金额
					save_oil_fee, // 班线油费节省
					oli_rebates, // 油费返利
					save_interests, // 节省利息
					save_ticket_time; // 节约贴票算账
				// 系统油耗
				if (!this.cart_power || !this.cart_type) {
					return alert('请输入您车队的基本指标');
				}
				best_oil_use = dict[this.cart_power][this.cart_type];
				if (!best_oil_use) {
					return alert('没有查到最佳系统油耗');
				}
				// 单车油耗差值
				diff_oil = this.oil_per_month - best_oil_use;
				// 石化返利 ???
				if (true) {} else {}
				// 计算结果

				loss_oil = this.oil_price * diff_oil * this.miles_per_month * 100 * 12;

				loss_interest = (this.non_g7_rate - 1.5 * 0.01) * this.funding_gap * 0.9;

				loss_account_time = 0.5 * 12 * this.cart_num;
				loss_ticket_time = 3 * 12 * this.cart_num;
				// 结果页2
				refueling_line = Math.min(this.g7_credit_line * 1.5, 3e6); 
				yilutong_line = refueling_line * 1 + 500000;
				save_time = loss_account_time * 1 + loss_ticket_time * 1;
				save_money = loss_oil * 1 + shihua_fanli * 1 + loss_interest * 1
				// save_oil_fee = diff_oil/this.oil_per_month 额外的油费返利??? 
				oli_rebates = (this.amount_per_month/this.cart_num/this.oil_price * 3 - 5000) * 0.1 + 5000 * 0.05;
				// save_interests = (this.non_g7_rate - 1.5 * 0.01) * this.tolls_per_month
				// save_ticket_time = 
			}
		}
	}

</script>

<style lang="scss">
	.container {
		display: inline-block; /*形成BFC,消除margin折叠*/
		width: 100%;
		background-color: #f2f2f2;
		padding: 0 0 .2rem;
	}
	.header {
		font-size: .17rem;
		text-align: center;
		margin: .37rem 0 0;
		letter-spacing: .2em;
		font-weight: bold;
	}
	.main-box {
		padding: .1rem .32rem;
	}
	.input-wrap {
		border: 1px solid #d3d3d3;
		height: .32rem;
		line-height: .32rem;
		background-color: #fff;
		margin: 0 0 .1rem;
		font-size: .12rem;
		input {
			float: left;		
			border: none;
			background: #fff;
			height: 100%;
			width: 2.5rem;
			padding: 0 0 0 .1rem;
		}
		// 输入单位
		span {
			color: #b2b2b2;
			float: right;
			padding: 0 .1rem 0 0;
		}
		select {
			float: left;		
			border: none;
			background: #fff;
			height: 100%;
			width: 100%;
			padding: 0 0 0 .1rem;
		}
	}
	// 按钮
	.btn-wrap {
		padding: 0 .32rem;
		span {
			display: inline-block;
			width: 100%;
			height: .36rem;
			line-height: .36rem;
			text-align: center;
			color: #fff;
			font-size: .16rem;
			background-color: #f26722;
		}
	}
</style>