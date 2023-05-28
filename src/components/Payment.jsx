/* eslint-disable no-mixed-spaces-and-tabs */
import { Input } from "./Input";
import { Modal } from "./Modal";
import { Button } from "./Button";

export function Payment({
	handleChange,
	minimumPayment,
	handleSubmitPayment,
	currentBalance,
	error,
	modalState,
	setModalState,
	paymentInputRef,
}) {
	const formattedMinimumPayment = !isNaN(minimumPayment)
		? Number(minimumPayment).toLocaleString(undefined, {
				style: "currency",
				currency: "USD",
		  })
		: "$0.00";

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
						<Input
							inputId="minimum"
							inputLabel="Minimum Payment*:"
							inputValue={formattedMinimumPayment}
							inputType="text"
							inputSubtext="*1% principal payment is required"
							isReadOnly={true}
						/>
						<Input
							inputId="payment"
							inputLabel="Payment Amount:"
							inputType="number"
							inputPlaceholderText="Enter payment amount"
							onChange={(e) => handleChange("payment", e.target.value)}
							inputNotation="$USD"
							inputRef={paymentInputRef}
						/>
						<Button
							className="payment__button"
							onClick={handleSubmitPayment}
							text="Submit Payment"
						/>
					</form>
					{{ error } && (
						<Modal isOpen={modalState} onClose={() => setModalState(false)}>
							<p className="error">
								Payment amount cannot be less than the minimum payment.
							</p>
							<button
								onClick={() => {
									setModalState(false);
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
