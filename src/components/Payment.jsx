/* eslint-disable no-mixed-spaces-and-tabs */
import { Input } from "./Input";
import { useRef, useState } from "react";
import { calculatePrincipalPayment } from "../js/utils";
import { Button } from "./Button";
import { Modal } from "./Modal";

export function Payment({
	minimumPayment,
	setPaymentValueInput,
	currentBalance,
	interestRate,
	processPayment,
}) {
	const [paymentError, setPaymentError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const paymentInputRef = useRef(null);

	const formattedMinimumPayment = !isNaN(minimumPayment)
		? Number(minimumPayment).toLocaleString(undefined, {
				style: "currency",
				currency: "USD",
		  })
		: "$0.00";

	const paymentComponentFormFields = [
		{
			id: "minimum",
			label: "Minimum Payment*:",
			type: "text",
			inputValue: formattedMinimumPayment,
			subtext: "*1% principal payment is required",
			readOnly: true,
		},
		{
			id: "payment",
			label: "Payment Amount:",
			phText: "Enter payment amount",
			notation: "$USD",
			subtext: "*Fixed Annual",
			inputRef: paymentInputRef,
			readOnly: false,
		},
	];

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		if (id === "payment") {
			setPaymentValueInput(value);
			setPaymentError(false);
		}
	};

	const handleUnderPayment = () => {
		setPaymentError(true);
		setIsModalOpen(true);
	};

	const handleSubmitPayment = (event) => {
		event.preventDefault();
		const parsedPaymentAmount = parseFloat(paymentInputRef.current.value);

		if (isNaN(parsedPaymentAmount)) {
			setPaymentError(true);
			return;
		}

		if (parsedPaymentAmount < minimumPayment) {
			handleUnderPayment();
		} else {
			const principalPayment = calculatePrincipalPayment(
				currentBalance,
				interestRate,
				parsedPaymentAmount,
				minimumPayment
			);
			processPayment(
				parsedPaymentAmount,
				principalPayment,
				currentBalance,
				interestRate
			);
		}

		paymentInputRef.current.value = "";
	};

	return (
		<div className="component__base">
			<h3>MAKE A PAYMENT</h3>
			<div className="payment__details">
				<div className="balance">
					<p className="number">
						{Number(currentBalance).toLocaleString(undefined, {
							style: "currency",
							currency: "USD",
						})}
					</p>
					<p className="description">BALANCE REMAINING</p>
				</div>
				<div className="minimum__payment">
					<form id="calcForm" className="payment__form">
						{paymentComponentFormFields.map((item) => {
							const {
								id,
								label,
								type,
								inputValue,
								phText,
								notation,
								subtext,
								inputRef,
								readOnly,
							} = item;
							return (
								<Input
									key={id}
									inputId={id}
									inputLabel={label}
									inputType={type}
									inputValue={inputValue}
									inputPlaceholderText={phText}
									handleChange={handleInputChange}
									inputNotation={notation}
									inputSubtext={subtext && subtext}
									inputRef={inputRef}
									isReadOnly={readOnly}
								/>
							);
						})}
						<Button
							className="payment__button"
							onClick={handleSubmitPayment}
							text="Submit Payment"
						/>
					</form>
					{paymentError && (
						<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
							<p className="error">
								Payment amount must be a number & cannot be less than the
								minimum payment.
							</p>
							<button
								onClick={() => {
									setIsModalOpen(false);
								}}
							>
								Close
							</button>
						</Modal>
					)}
				</div>
			</div>
		</div>
	);
}
