export const calculateMinimumPayment = (loanValueInput, interestValueInput) => {
	loanValueInput = parseFloat(loanValueInput);
	interestValueInput = parseFloat(interestValueInput);
	if (!loanValueInput || isNaN(loanValueInput) || isNaN(interestValueInput)) {
		return "$0.00";
	}
	const interestCalculated = interestValueInput / 100 / 12;
	const interestCharged = interestCalculated * loanValueInput;
	const onePercentMinimumCharged = loanValueInput * 0.01;
	let loanPrincipal = interestCharged + onePercentMinimumCharged;

	if (loanValueInput <= 100) {
		loanPrincipal = loanValueInput + 0.01 * loanValueInput;
	}

	const minimumPayment = loanPrincipal;
	return minimumPayment.toFixed(2);
};

export function calculateLoanTotal(loanValueInput, interestValueInput) {
	loanValueInput = parseFloat(loanValueInput);
	interestValueInput = parseFloat(interestValueInput);

	const interestCalculated = interestValueInput / 100 / 12;
	const interestCharged = interestCalculated * loanValueInput;
	const loanTotal = loanValueInput + interestCharged;

	return loanTotal;
}

export function calculateRemainingPayments(loanTotal, minimumPayment) {
	const paymentsRemaining = Math.ceil(loanTotal / minimumPayment);
	return paymentsRemaining;
}
