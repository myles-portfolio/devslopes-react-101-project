import { useState } from "react";
import "./css/App.css";
import { Calculator } from "./components/Calculator";
import { History } from "./components/History";
import { Button } from "./components/Button";
import { clearInputs } from "./utils";

function App() {
	const [loanValueInput, setLoanValue] = useState(0);
	const [interestValueInput, setInterestValue] = useState(0);
	const [minimumPayment, setMinimumPayment] = useState(0);
	const [paymentAmount, setPaymentAmount] = useState("");
	const [paymentsRemaining, setRemainingPayments] = useState(0);
	const [transactions, setTransactions] = useState([]);

	const recordPayment = (balance, payment, overPayment) => {
		const transactionBalance = parseFloat(balance.toFixed(2));
		const transactionPayment = parseFloat(payment);
		const isOverPayment = overPayment;
		const transactionDate = new Date().toLocaleString();
		const updatedTransaction = [
			...transactions,
			[transactionPayment, isOverPayment, transactionBalance, transactionDate],
		];

		setTransactions(updatedTransaction);
	};

	const handleCalculatorReset = () => {
		setMinimumPayment(0);
		setLoanValue(0);
		setInterestValue(0);
		setPaymentAmount(0);
		setRemainingPayments(0);
		setTransactions([]);
		clearInputs();
	};

	const resetIcon = <i className="fa-sharp fa-solid fa-arrow-rotate-right"></i>;

	return (
		<>
			<div>
				<div className="ultraTop">
					<h1>Debt-Free Calculator</h1>
					<div className="buttons">
						<Button
							className="button__default"
							onClick={handleCalculatorReset}
							text={resetIcon}
						/>
					</div>
				</div>
				<div className="top">
					<Calculator
						recordPayment={recordPayment}
						loanValueInput={loanValueInput}
						setLoanValue={setLoanValue}
						interestValueInput={interestValueInput}
						setInterestValue={setInterestValue}
						minimumPayment={minimumPayment}
						setMinimumPayment={setMinimumPayment}
						paymentAmount={paymentAmount}
						setPaymentAmount={setPaymentAmount}
						paymentsRemaining={paymentsRemaining}
						setRemainingPayments={setRemainingPayments}
					/>
				</div>
				<div className="bottom">
					<History transactions={transactions} />
				</div>
			</div>
		</>
	);
}

export default App;
