import { Loan } from "./Loan";
import { Payment } from "./Payment";
import { useState, useEffect } from "react";
import { calculateRemainingPayments, calculateMinimumPayment } from "../utils";

export function Calculator() {
	const [loanValueInput, setLoanValue] = useState(null);
	const [interestValueInput, setInterestValue] = useState(null);
	const [currentBalance, setBalance] = useState(0);
	const [paymentError, setPaymentError] = useState(false);
	const [paymentAmount, setPaymentAmount] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [minimumPayment, setMinimumPayment] = useState(0);
	const [paymentsRemaining, setRemainingPayments] = useState(0);

	const loanValue = parseFloat(loanValueInput);
	const interestValue = parseFloat(interestValueInput);

	const paymentsLeft = calculateRemainingPayments(loanValue, interestValue);

	useEffect(() => {
		if (!isNaN(loanValue) && !isNaN(interestValue)) {
			const initialBalance = loanValue;
			setBalance(initialBalance);
			setMinimumPayment(calculateMinimumPayment(initialBalance, interestValue));
			setRemainingPayments(paymentsLeft);
		} else {
			setBalance(loanValue || 0);
			setRemainingPayments("--");
			setMinimumPayment(0);
		}
	}, [loanValue, interestValue, paymentsLeft]);

	const updateLoanValue = (value) => {
		setLoanValue(value);
	};

	const updateInterestValue = (value) => {
		setInterestValue(value);
	};

	const updateCurrentBalance = (value) => {
		setBalance(value);
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
			const newBalance = currentBalance - parseFloat(paymentAmount);
			updateCurrentBalance(newBalance);
			if (newBalance <= 0) {
				setMinimumPayment(0);
				setBalance(0);
				setRemainingPayments(0);
			} else {
				const newMinimumPayment = calculateMinimumPayment(
					newBalance,
					interestValue
				);
				setMinimumPayment(newMinimumPayment);
				updateRemainingPayments();
			}
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
