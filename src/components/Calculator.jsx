import { Loan } from "./Loan";
import { Payment } from "./Payment";
import "../css/Calculator.css";
import { useState, useEffect, useRef } from "react";
import { calculateRemainingPayments, calculateMinimumPayment } from "../utils";

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
		const newBalance = currentBalance - parseFloat(paymentAmount);
		const overPaymentAmount =
			parseFloat(paymentAmount) - parseFloat(minimumPayment);
		const adjustedBalance = newBalance - overPaymentAmount;

		if (paymentAmount < minimumPayment) {
			handleUnderPayment();
		} else if (paymentAmount === minimumPayment) {
			handleMinimumPayment(newBalance, interestValue, paymentAmount);
		} else if (paymentAmount > minimumPayment) {
			handleOverPayment(
				newBalance,
				adjustedBalance,
				interestValue,
				paymentAmount
			);
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
			setBalance(newBalance);
		}
	};

	const handleOverPayment = (
		newBalance,
		adjustedBalance,
		interestValue,
		paymentAmount
	) => {
		if (adjustedBalance <= 0) {
			handleNegativeBalance();
		} else {
			const newMinimumPayment = calculateMinimumPayment(
				adjustedBalance,
				interestValue
			);
			setMinimumPayment(newMinimumPayment);
			const newPaymentsRemaining = calculateRemainingPayments(
				adjustedBalance,
				interestValue
			);
			setRemainingPayments(newPaymentsRemaining);
			updateRemainingPayments();
			recordPayment(newBalance, paymentAmount, true);
			setBalance(adjustedBalance);
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
