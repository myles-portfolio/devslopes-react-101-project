import { Input } from "./Input";

export function Loan({ handleChange }) {
	return (
		<div className="component__base">
			<h3>TELL US ABOUT YOUR LOAN</h3>
			<p className="loan__text">
				Enter your <span className="highlight">loan amount</span> and
				<span className="highlight">interest rate</span> below to calculate your
				minimum monthly payment.
			</p>
			<form className="loan__form">
				<Input
					inputId="loan"
					inputLabel="Loan Amount:"
					inputType="number"
					inputPlaceholderText="Enter dollar amount"
					onChange={(e) => handleChange("loan", e.target.value)}
					inputNotation="$USD"
					inputSubtext=""
				/>
				<Input
					inputId="interest"
					inputLabel="Interest Rate*:"
					inputType="number"
					inputPlaceholderText="Enter an interest rate"
					onChange={(e) => handleChange("interest", e.target.value)}
					inputNotation="%"
					inputSubtext="*Fixed Annual"
				/>
			</form>
			<div className="payments__remaining">
				<p>Number of minimum payments left until debt-free:</p>
				{/* <p>Remaining Payments</p> */}
			</div>
		</div>
	);
}
