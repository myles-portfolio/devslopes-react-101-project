import "/src/css/History.css";
import { formatCurrency } from "../js/utils";

export function History({ transactions }) {
	const titles = [
		"Payment Amount:",
		"Over Payment?:",
		"New Balance:",
		"Transaction Date:",
	];
	return (
		<div className="component__base">
			<h3>PAYMENT HISTORY</h3>
			<div className="history__list">
				<div className="history__header">
					{titles.map((title) => (
						<div key={title} className="hh__title">
							{title}
						</div>
					))}
				</div>
				<div className="hi__container">
					{/* I don't know how to make this not repetitive */}
					{transactions.map((transaction) => (
						<div key={transaction} className="history__items">
							<div className="hi__detail">{formatCurrency(transaction[0])}</div>
							<div className="hi__detail">{transaction[1] ? "Yes" : "No"}</div>
							<div className="hi__detail">{formatCurrency(transaction[2])}</div>
							<div className="hi__detail">{transaction[3]}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
