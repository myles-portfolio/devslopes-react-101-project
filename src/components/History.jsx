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
					{transactions.map((transaction) => (
						<div key={transaction[3]} className="history__items">
							{transaction.map((item, index) => (
								<div key={index} className="hi__detail">
									{index === 0 || index === 2
										? formatCurrency(item)
										: index === 1
										? item
											? "Yes"
											: "No"
										: item}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
