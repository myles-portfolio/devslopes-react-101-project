export function Modal({ isOpen, onClose, children }) {
	const modalStyle = {
		display: isOpen ? "block" : "none",
	};

	return (
		<div className="modal" style={modalStyle}>
			<div className="modal__content">{children}</div>
			<div className="modal__overlay" onClick={onClose}></div>
		</div>
	);
}
