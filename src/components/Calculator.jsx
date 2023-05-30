import "/src/css/Calculator.css";
import { useState } from "react";
import { Loan } from "./Loan";
import { Payment } from "./Payment";
import {
	calculateTotalMinimumPayments,
	calculateMinimumPayment,
	formatCurrency,
} from "../js/utils";

export function Calculator({
	loanValueInput,
	setLoanValueInput,
	interestValueInput,
	setInterestValueInput,
	currentBalance,
	setBalance,
	interestRate,
	paymentValueInput,
	setPaymentValueInput,
	updatePaymentHistory,
}) {
	const [isFinalPayment, setIsFinalPayment] = useState(false);
	const paymentsRemaining = calculateTotalMinimumPayments(
		currentBalance,
		interestRate
	);

	let formattedMinimumPayment = formatCurrency(
		calculateMinimumPayment(currentBalance, interestRate)
	);

	const processPayment = (
		parsedPaymentAmount,
		principalPayment,
		currentBalance,
		interestRate
	) => {
		const newBalance = currentBalance - principalPayment[0];
		const finalBalance = calculateMinimumPayment(newBalance, interestRate);

		if (newBalance <= 0) {
			setBalance(0);
			updatePaymentHistory(0, parsedPaymentAmount, principalPayment[1]);
		} else {
			updatePaymentHistory(
				newBalance,
				parsedPaymentAmount,
				principalPayment[1]
			);
			setBalance(newBalance);
		}

		if (newBalance === 0) {
			updatePaymentHistory(
				finalBalance,
				parsedPaymentAmount,
				principalPayment[1]
			);
		}

		if (paymentsRemaining === 2) {
			setIsFinalPayment(true);
		}
	};

	return (
		<div style={{ display: "flex", gap: "10px" }}>
			<Loan
				loanValueInput={loanValueInput}
				setLoanValueInput={setLoanValueInput}
				interestValueInput={interestValueInput}
				setInterestValueInput={setInterestValueInput}
				paymentsRemaining={paymentsRemaining}
			/>
			<Payment
				paymentValueInput={paymentValueInput}
				setPaymentValueInput={setPaymentValueInput}
				currentBalance={currentBalance}
				interestRate={interestRate}
				processPayment={processPayment}
				formattedMinimumPayment={formattedMinimumPayment}
				isFinalPayment={isFinalPayment}
			/>
		</div>
	);
}
