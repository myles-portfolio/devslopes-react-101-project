import { Loan } from "./Loan";
import { Payment } from "./Payment";
import { useState, useEffect, useRef } from "react";
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

	const handleSubmitPayment = (event) => {
		event.preventDefault();
		const newBalance = currentBalance - parseFloat(paymentAmount);
		const overPaymentAmount =
			parseFloat(paymentAmount) - parseFloat(minimumPayment);
		const adjustedBalance = newBalance - overPaymentAmount;

		if (paymentAmount < minimumPayment) {
			handleUnderPayment();
		} else if (paymentAmount === minimumPayment) {
			handleMinimumPayment(newBalance, interestValue);
		} else if (paymentAmount > minimumPayment) {
			handleOverPayment(adjustedBalance, interestValue);
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

	const handleMinimumPayment = (newBalance, interestValue) => {
		if (newBalance <= 0) {
			handleNegativeBalance();
		} else {
			const newMinimumPayment = calculateMinimumPayment(
				newBalance,
				interestValue
			);
			setMinimumPayment(newMinimumPayment);
			updateRemainingPayments();
			setBalance(newBalance);
		}
	};

	const handleOverPayment = (adjustedBalance, interestValue) => {
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
			setBalance(adjustedBalance);
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
				paymentInputRef={paymentInputRef}
			/>
		</div>
	);
}
