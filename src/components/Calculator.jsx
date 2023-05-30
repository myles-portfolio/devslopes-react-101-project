import "../css/calculator.css";
import { useEffect } from "react";
import { Loan } from "./Loan";
import { Payment } from "./Payment";
import {
	calculateRemainingPayments,
	calculateMinimumPayment,
} from "../js/utils";

export function Calculator({
	loanValueInput,
	setLoanValueInput,
	interestValueInput,
	setInterestValueInput,
	currentBalance,
	setBalance,
	interestRate,
	minimumPayment,
	setMinimumPayment,
	paymentValueInput,
	setPaymentValueInput,
	updatePaymentHistory,
}) {
	useEffect(() => {
		if (!isNaN(currentBalance) && !isNaN(interestRate)) {
			setMinimumPayment(calculateMinimumPayment(currentBalance, interestRate));
		} else {
			setBalance(currentBalance || 0);
			setMinimumPayment(0);
		}
	}, [currentBalance, interestRate, setBalance, setMinimumPayment]);

	const handleNegativeBalance = () => {
		setMinimumPayment(0);
		setBalance(0);
	};

	const processPayment = (
		parsedPaymentAmount,
		principalPayment,
		currentBalance,
		interestRate
	) => {
		let newBalance = currentBalance - principalPayment[0];
		if (newBalance <= 0) {
			handleNegativeBalance();
		} else {
			const newMinimumPayment = calculateMinimumPayment(
				newBalance,
				interestRate
			);
			setMinimumPayment(newMinimumPayment);
			calculateRemainingPayments(newBalance, interestRate);

			updatePaymentHistory(
				newBalance,
				parsedPaymentAmount,
				principalPayment[1]
			);
			setBalance(newBalance);
		}
	};

	return (
		<div style={{ display: "flex", gap: "10px" }}>
			<Loan
				loanValueInput={loanValueInput}
				setLoanValueInput={setLoanValueInput}
				interestValueInput={interestValueInput}
				setInterestValueInput={setInterestValueInput}
				currentBalance={currentBalance}
				interestRate={interestRate}
			/>
			<Payment
				minimumPayment={minimumPayment}
				paymentValueInput={paymentValueInput}
				setPaymentValueInput={setPaymentValueInput}
				currentBalance={currentBalance}
				interestRate={interestRate}
				processPayment={processPayment}
			/>
		</div>
	);
}
