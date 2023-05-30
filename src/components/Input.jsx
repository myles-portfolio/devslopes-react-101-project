export function Input({
	inputId,
	inputLabel,
	inputType,
	inputValue,
	inputPlaceholderText,
	handleInputChange,
	inputNotation,
	inputSubtext,
	inputRef,
	isReadOnly,
}) {
	return (
		<div className="input__field">
			<label className="label">{inputLabel}</label>
			<div className="input__row">
				<input
					id={inputId}
					type={inputType}
					value={inputValue}
					placeholder={inputPlaceholderText}
					onChange={handleInputChange}
					ref={inputRef}
					readOnly={isReadOnly ? "readOnly" : undefined}
				/>
				<p className="input__note">{inputNotation}</p>
			</div>
			<p className="input__subtext">{inputSubtext}</p>
		</div>
	);
}
