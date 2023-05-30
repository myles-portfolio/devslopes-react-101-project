import "../css/app.css";
import { useState, useEffect } from "react";
import { Calculator } from "./Calculator";
import { History } from "./History";
import { Button } from "./Button";

function App() {
	const [loanValueInput, setLoanValueInput] = useState("");
	const [interestValueInput, setInterestValueInput] = useState("");
	const [currentBalance, setBalance] = useState(0);
	const [interestRate, setInterest] = useState(0);
	const [paymentValueInput, setPaymentValueInput] = useState("");
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const balance = parseFloat(loanValueInput) || 0;
		const interest = parseFloat(interestValueInput) || 0;

		setBalance(balance);
		setInterest(interest);
	}, [loanValueInput, interestValueInput, paymentValueInput]);

	const updatePaymentHistory = (balance, payment, isOverPayment) => {
		const date = new Date().toLocaleString();
		const transaction = [
			...transactions,
			[payment, isOverPayment, balance, date],
		];
		setTransactions(transaction);
	};

	const handleCalculatorReset = () => {
		setLoanValueInput("");
		setInterestValueInput("");
		setPaymentValueInput("");
		setBalance(0);
		setInterest(0);
		setTransactions([]);
	};

	const resetIcon = <img src="public\reset.png" alt="reset" />;

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
						loanValueInput={loanValueInput}
						setLoanValueInput={setLoanValueInput}
						interestValueInput={interestValueInput}
						setInterestValueInput={setInterestValueInput}
						currentBalance={currentBalance}
						interestRate={interestRate}
						paymentValueInput={paymentValueInput}
						setPaymentValueInput={setPaymentValueInput}
						setBalance={setBalance}
						updatePaymentHistory={updatePaymentHistory}
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
