export function Input({
	inputId,
	inputLabel,
	inputType,
	inputPlaceholderText,
	onChange,
	inputNotation,
	inputSubtext,
	inputRef,
}) {
	return (
		<div id={inputId} className="input__field">
			<label className="label">{inputLabel}</label>
			<div className="input__row">
				<input
					type={inputType}
					placeholder={inputPlaceholderText}
					onChange={onChange}
					ref={inputRef}
				/>
				<p className="input__note">{inputNotation}</p>
			</div>
			<p className="input__subtext">{inputSubtext}</p>
		</div>
	);
}
