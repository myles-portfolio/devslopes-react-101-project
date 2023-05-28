import { Loan } from "./Loan";
import { Payment } from "./Payment";
import "../css/Calculator.css";
import { useState, useEffect, useRef } from "react";
import {
	calculateRemainingPayments,
	calculateMinimumPayment,
	calculateInterestPayment,
} from "../utils";

export function Calculator({
	recordPayment,
	loanValueInput,
	setLoanValue,
	interestValueInput,
	setInterestValue,
	minimumPayment,
	setMinimumPayment,
	paymentAmount,
	setPaymentAmount,
	paymentsRemaining,
	setRemainingPayments,
}) {
	const [currentBalance, setBalance] = useState(0);
	const [paymentError, setPaymentError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
	}, [
		loanValue,
		interestValue,
		paymentsLeft,
		setMinimumPayment,
		setRemainingPayments,
	]);

	const updateLoanValue = (value) => {
		setLoanValue(value);
	};

	const updateInterestValue = (value) => {
		setInterestValue(value);
	};

	const updateCurrentBalance = (value) => {
		value = parseFloat(value);
		setBalance(value);
	};

	const updateRemainingPayments = () => {
		setRemainingPayments((prevRemainingPayments) => prevRemainingPayments - 1);
	};

	const handleChange = (inputId, value) => {
		switch (inputId) {
			case "loan":
				updateLoanValue(value);
				break;
			case "interest":
				updateInterestValue(value);
				break;
			case "payment":
				setPaymentAmount(value);
				setPaymentError(false);
				break;
			default:
				break;
		}
	};

	const paymentInputRef = useRef(null);
	const loanInputRef = useRef(0);
	const interestInputRef = useRef(0);

	const handleSubmitPayment = (event) => {
		event.preventDefault();

		const parsedPaymentAmount = parseFloat(paymentAmount);

		if (parsedPaymentAmount < minimumPayment) {
			handleUnderPayment();
		} else if (Math.abs(parsedPaymentAmount - minimumPayment) < 0.01) {
			const newBalance = currentBalance - parsedPaymentAmount;
			handleMinimumPayment(newBalance, interestValue, parsedPaymentAmount);
		} else if (parsedPaymentAmount > minimumPayment) {
			handleOverPayment(currentBalance, interestValue, parsedPaymentAmount);
		}

		paymentInputRef.current.value = "";
	};

	const handleNegativeBalance = () => {
		setMinimumPayment(0);
		setBalance(0);
		setRemainingPayments(0);
	};

	const handleUnderPayment = () => {
		setPaymentError(true);
		setIsModalOpen(true);
	};

	const handleMinimumPayment = (newBalance, interestValue, paymentAmount) => {
		if (newBalance <= 0) {
			handleNegativeBalance();
		} else {
			const newMinimumPayment = calculateMinimumPayment(
				newBalance,
				interestValue
			);
			setMinimumPayment(newMinimumPayment);
			updateRemainingPayments();
			recordPayment(newBalance, paymentAmount, false);
			updateCurrentBalance(newBalance);
		}
	};

	const handleOverPayment = (currentBalance, interestValue, paymentAmount) => {
		let overPaymentInterest = calculateInterestPayment(
			currentBalance,
			interestValue
		);
		overPaymentInterest = overPaymentInterest.toFixed(2);
		overPaymentInterest = parseFloat(overPaymentInterest);
		paymentAmount = parseFloat(paymentAmount);
		const principalPayment = paymentAmount - overPaymentInterest;
		let newBalance = currentBalance - principalPayment;
		if (newBalance <= 0) {
			handleNegativeBalance();
		} else {
			const newMinimumPayment = calculateMinimumPayment(
				newBalance,
				interestValue
			);
			setMinimumPayment(newMinimumPayment);
			const newPaymentsRemaining = calculateRemainingPayments(
				newBalance,
				interestValue
			);
			setRemainingPayments(newPaymentsRemaining);
			updateRemainingPayments();
			recordPayment(newBalance, paymentAmount, true);
			updateCurrentBalance(newBalance);
		}
	};

	return (
		<div style={{ display: "flex", gap: "10px" }}>
			<Loan
				handleChange={handleChange}
				paymentsLeft={paymentsRemaining}
				loanInputRef={loanInputRef}
				interestInputRef={interestInputRef}
			/>
			<Payment
				handleChange={handleChange}
				minimumPayment={minimumPayment}
				handleSubmitPayment={handleSubmitPayment}
				currentBalance={currentBalance}
				error={paymentError}
				modalState={isModalOpen}
				setModalState={() => setIsModalOpen(false)}
				paymentInputRef={paymentInputRef}
			/>
		</div>
	);
}
