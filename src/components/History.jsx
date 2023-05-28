import "../css/History.css";

export function History({ transactions }) {
	return (
		<div className="component__base">
			<h3>PAYMENT HISTORY</h3>
			<div className="history__list">
				<div className="history__header">
					<div className="hh__title">Current Balance:</div>
					<div className="hh__title">Payment Amount:</div>
					<div className="hh__title">Over Payment?:</div>
					<div className="hh__title">Transaction Date:</div>
				</div>
				{transactions.map((transaction, index) => (
					<div key={index} className="history__item">
						<div>${transaction[0]}</div>
						<div>${transaction[1]}</div>
						<div>{transaction[2] ? "Yes" : "No"}</div>
					</div>
				))}
			</div>
		</div>
	);
}
