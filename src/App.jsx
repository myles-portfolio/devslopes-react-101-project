import { useState } from "react";
import "./css/App.css";
import { Calculator } from "./components/Calculator";
import { History } from "./components/History";

function App() {
	const [transactions, setTransactions] = useState([]);

	const recordPayment = (balance, payment, overPayment) => {
		const transactionBalance = balance;
		const transactionPayment = parseFloat(payment);
		const isOverPayment = overPayment;
		const updatedTransaction = [
			...transactions,
			[transactionBalance, transactionPayment, isOverPayment],
		];

		setTransactions(updatedTransaction);
	};

	console.log("Transaction:", transactions);

	return (
		<>
			<div className="ultraTop">
				<h1>Debt-Free Calculator</h1>
				<button className="resetBtn">
					<i className="fa-sharp fa-solid fa-arrow-rotate-right"></i>
				</button>
			</div>
			<div className="top">
				<Calculator recordPayment={recordPayment} />
			</div>
			<div className="bottom">
				<History transactions={transactions} />
			</div>
		</>
	);
}

export default App;
