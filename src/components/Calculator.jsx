import { Loan } from "./Loan";
import { Payment } from "./Payment";
import { useState, useEffect } from "react";
import {
	calculateRemainingPayments,
	calculateLoanTotal,
	calculateMinimumPayment,
} from "../utils";

export function Calculator() {
	const [loanValueInput, setLoanValue] = useState(0);
	const [interestValueInput, setInterestValue] = useState(0);
	const [currentBalance, setBalance] = useState(0);
	const [paymentError, setPaymentError] = useState(false);
	const [paymentAmount, setPaymentAmount] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [minimumPayment, setMinimumPayment] = useState(0);
	const [paymentsRemaining, setRemainingPayments] = useState(0);

	const loanValue = parseFloat(loanValueInput);
	const interestValue = parseFloat(interestValueInput);

	useEffect(() => {
		if (!isNaN(loanValue) && !isNaN(interestValue)) {
			const initialBalance = calculateLoanTotal(loanValue, interestValue);
			setBalance(initialBalance);
			setMinimumPayment(calculateMinimumPayment(initialBalance, interestValue));
			setRemainingPayments(calculateRemainingPayments(initialBalance));
		} else {
			setBalance(loanValue || 0);
		}
	}, [loanValue, interestValue, currentBalance]);

	const updateLoanValue = (value) => {
		setLoanValue(value);
	};

	const updateInterestValue = (value) => {
		setInterestValue(value);
	};

	const updateRemainingPayments = () => {
		setRemainingPayments((prevRemainingPayments) => prevRemainingPayments - 1);
	};

	const handleChange = (inputId, value) => {
		if (inputId === "loan") {
			updateLoanValue(value);
		} else if (inputId === "interest") {
			updateInterestValue(value);
		} else if (inputId === "payment") {
			setPaymentAmount(value);
			setPaymentError(false);
		}
	};

	const handleSubmitPayment = (event) => {
		event.preventDefault();
		if (paymentAmount < minimumPayment) {
			setPaymentError(true);
			setIsModalOpen(true);
		} else {
			setBalance(currentBalance - paymentAmount);
			updateRemainingPayments();
			setPaymentAmount("");
		}
	};

	return (
		<div style={{ display: "flex", gap: "10px" }}>
			<Loan handleChange={handleChange} paymentsLeft={paymentsRemaining} />
			<Payment
				handleChange={handleChange}
				minimumPayment={minimumPayment}
				handleSubmitPayment={handleSubmitPayment}
				currentBalance={currentBalance}
				error={paymentError}
				modalState={isModalOpen}
				setModalState={() => setIsModalOpen(false)}
			/>
		</div>
	);
}
