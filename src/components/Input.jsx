export function Input({
	inputId,
	inputLabel,
	inputValue,
	inputType,
	inputPlaceholderText,
	onChange,
	inputNotation,
	inputSubtext,
	inputRef,
	isReadOnly,
}) {
	const readOnlyProps = isReadOnly ? { readOnly: true } : {};

	return (
		<div id={inputId} className="input__field">
			<label className="label">{inputLabel}</label>
			<div className="input__row">
				<input
					type={inputType}
					value={inputValue}
					placeholder={inputPlaceholderText}
					onChange={onChange}
					ref={inputRef}
					{...readOnlyProps}
				/>
				<p className="input__note">{inputNotation}</p>
			</div>
			<p className="input__subtext">{inputSubtext}</p>
		</div>
	);
}
