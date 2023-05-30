import { Input } from "./Input";
import { useRef } from "react";

export function Loan({
	loanValueInput,
	setLoanValueInput,
	interestValueInput,
	setInterestValueInput,
	paymentsRemaining,
}) {
	const loanInputRef = useRef(0);
	const interestInputRef = useRef(0);

	const loanComponentFormFields = [
		{
			id: "loan",
			label: "Loan Amount:",
			inputValue: loanValueInput,
			phText: "Enter dollar amount",
			notation: "$USD",
			inputRef: loanInputRef,
		},
		{
			id: "interest",
			label: "Interest Rate*:",
			inputValue: interestValueInput,
			phText: "Enter an interest rate",
			notation: "%",
			subtext: "*Fixed Annual",
			inputRef: interestInputRef,
		},
	];

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		if (id === "loan") {
			setLoanValueInput(value);
		} else if (id === "interest") {
			setInterestValueInput(value);
		}
	};

	return (
		<div className="component__base">
			<h3>TELL US ABOUT YOUR LOAN</h3>

			<p className="loan__text">
				Enter your <span className="highlight">loan amount</span> and{" "}
				<span className="highlight">interest rate</span> below to calculate your
				minimum monthly payment.
			</p>

			<form id="calcForm" className="loan__form">
				{loanComponentFormFields.map((item) => {
					const { id, label, inputValue, phText, notation, subtext, inputRef } =
						item;
					return (
						<Input
							key={id}
							inputId={id}
							inputLabel={label}
							inputValue={inputValue}
							inputPlaceholderText={phText}
							handleInputChange={handleInputChange}
							inputNotation={notation}
							inputSubtext={subtext && subtext}
							inputRef={inputRef}
						/>
					);
				})}
			</form>

			<div className="payments__remaining">
				<p>Number of monthly minimum payments left until debt-free:</p>
				<p>
					{isNaN(paymentsRemaining) || paymentsRemaining === 0
						? "--"
						: paymentsRemaining}
				</p>
			</div>
		</div>
	);
}
