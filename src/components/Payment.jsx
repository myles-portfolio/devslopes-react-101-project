import { Input } from "./Input";
import { Modal } from "./Modal";

export function Payment({
	handleChange,
	minimumPayment,
	handleSubmitPayment,
	currentBalance,
	error,
	modalState,
	setModalState,
}) {
	const displayedBalance = Number(currentBalance).toLocaleString(undefined, {
		style: "currency",
		currency: "USD",
	});

	return (
		<div className="component__base">
			<h3>MAKE A PAYMENT</h3>
			<div className="payment__details">
				<div className="balance">
					<p className="number">{displayedBalance}</p>
					<p className="description">BALANCE REMAINING</p>
				</div>
				<div className="minimum__payment">
					<div className="mp__input">
						<label className="label">Minimum Payment*:</label>
						<input type="text" value={`${minimumPayment}`} readOnly />
						<p className="input__subtext">*1% principal payment is required</p>
					</div>
					<form className="payment__form">
						<Input
							inputId="payment"
							inputLabel="Payment Amount:"
							inputType="number"
							inputPlaceholderText="Enter payment amount"
							onChange={(e) => handleChange("payment", e.target.value)}
							inputNotation="$USD"
							inputSubtext=""
						/>
						<button className="payment__button" onClick={handleSubmitPayment}>
							Submit Payment
						</button>
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
