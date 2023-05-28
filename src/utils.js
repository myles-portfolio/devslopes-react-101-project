export const calculateInterestPayment = (balance, interest) => {
	const interestCalculated = interest / 100 / 12;
	let value = interestCalculated * balance;
	return parseFloat(value);
};

export const calculateMinimumPayment = (loanValueInput, interestValueInput) => {
	loanValueInput = parseFloat(loanValueInput);
	interestValueInput = parseFloat(interestValueInput);

	if (!loanValueInput || isNaN(loanValueInput) || isNaN(interestValueInput)) {
		return "$0.00";
	}
	let interestCharged = calculateInterestPayment(
		loanValueInput,
		interestValueInput
	);
	const onePercentMinimumCharged = loanValueInput * 0.01;
	let minimumPayment = interestCharged + onePercentMinimumCharged;

	if (loanValueInput <= 100) {
		minimumPayment = loanValueInput + 0.01 * loanValueInput;
	}

	return minimumPayment.toFixed(2);
};

export function calculateRemainingPayments(loanTotal, interestValueInput) {
	loanTotal = parseFloat(loanTotal);
	const onePercentMinimumCharged = loanTotal * 0.01;
	let remainingBalance = loanTotal;
	let remainingPayments = 0;

	while (remainingBalance > 0) {
		let minimumPayment = calculateMinimumPayment(
			remainingBalance,
			interestValueInput
		);

		if (remainingBalance <= 100) {
			// Edge case: Total balance <= $100
			minimumPayment = remainingBalance + onePercentMinimumCharged;
		}

		remainingPayments++;
		let newBalance = (remainingBalance -= minimumPayment);
		remainingBalance = newBalance.toFixed(2);
	}
	return remainingPayments;
}

export function clearInputs() {
	document.getElementById("calcForm").reset();
}

export function formatCurrency(value) {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
}
