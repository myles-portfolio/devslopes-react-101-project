import "../css/History.css";
import { formatCurrency } from "../utils";

export function History({ transactions }) {
	return (
		<div className="component__base">
			<h3>PAYMENT HISTORY</h3>
			<div className="history__list">
				<div className="history__header">
					<div className="hh__title">Payment Amount:</div>
					<div className="hh__title">Over Payment?:</div>
					<div className="hh__title">New Balance:</div>
					<div className="hh__title">Transaction Date:</div>
				</div>
				<div className="hi__container">
					{transactions.map((transaction, index) => (
						<div key={index} className="history__items">
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
