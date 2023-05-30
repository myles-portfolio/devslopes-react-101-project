export const calculateMinimumPayment = (balance, interest) => {
	const principalPayment = balance * 0.01;
	const interestPayment = balance * (interest / 100 / 12);
	let roundedMinimumPayment;

	if (balance > 100) {
		const roundedInterestPayment = parseFloat(interestPayment.toFixed(2));
		const minimumPayment = principalPayment + roundedInterestPayment;
		roundedMinimumPayment = parseFloat(minimumPayment.toFixed(2));
	} else {
		const lastPayment = balance + principalPayment;
		roundedMinimumPayment = parseFloat(lastPayment.toFixed(2));
	}
	return parseFloat(roundedMinimumPayment);
};

export const calculateInterestPayment = (balance, interest) => {
	const interestCalculated = interest / 100 / 12;
	let value = interestCalculated * balance;

	return parseFloat(value);
};

export const calculatePrincipalPayment = (
	balance,
	interest,
	paymentAmount,
	minimumPayment
) => {
	const isOverPayment = paymentAmount !== minimumPayment;
	const interestPayment = parseFloat(
		calculateInterestPayment(balance, interest).toFixed(2)
	);
	const principalPayment = parseFloat(
		(paymentAmount - interestPayment).toFixed(2)
	);

	return [principalPayment, isOverPayment];
};

export function calculateTotalMinimumPayments(balance, interest) {
	balance = parseFloat(balance);
	let remainingPayments = 0;

	while (balance > 0) {
		let paymentAmount = calculateMinimumPayment(balance, interest);
		let interestPayment = balance * (interest / 100 / 12);
		let principalPayment = parseFloat(
			(paymentAmount - interestPayment).toFixed(2)
		);

		if (balance <= 100) {
			// Edge case: Total balance <= $100
			remainingPayments += 1;
			break;
		}

		remainingPayments++;
		let newBalance = (balance - principalPayment).toFixed(2);
		balance = parseFloat(newBalance);
	}
	return remainingPayments;
}

export function formatCurrency(value) {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
}
