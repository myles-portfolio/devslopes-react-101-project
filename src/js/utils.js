export const calculateInterestPayment = (balance, interest) => {
	const interestCalculated = interest / 100 / 12;
	let value = interestCalculated * balance;
	return parseFloat(value);
};

export const calculateMinimumPayment = (balance, interest) => {
	balance = parseFloat(balance);
	interest = parseFloat(interest);

	if (!balance || isNaN(balance) || isNaN(interest)) {
		return "$0.00";
	}
	let interestCharged = calculateInterestPayment(balance, interest);
	const onePercentMinimumCharged = balance * 0.01;
	let minimumPayment = interestCharged + onePercentMinimumCharged;

	if (balance <= 100) {
		minimumPayment = balance + 0.01 * balance;
	}

	return parseFloat(minimumPayment.toFixed(2));
};

export const calculatePrincipalPayment = (
	currentBalance,
	interestValue,
	paymentAmount,
	minimumPayment
) => {
	console.log("Min Payment:", minimumPayment);
	console.log("Payment Amount:", paymentAmount);
	let isOverPayment;
	if (paymentAmount === minimumPayment) {
		isOverPayment = false;
	} else {
		isOverPayment = true;
	}

	let interestPayment = calculateInterestPayment(currentBalance, interestValue);
	interestPayment = parseFloat(interestPayment.toFixed(2));
	paymentAmount = parseFloat(paymentAmount);
	const principalPayment = parseFloat(
		(paymentAmount - interestPayment).toFixed(2)
	);
	console.log("Payment:", [principalPayment, isOverPayment]);
	return [principalPayment, isOverPayment];
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
