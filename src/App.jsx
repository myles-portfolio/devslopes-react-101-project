import "./App.css";
import { Calculator } from "./components/Calculator";
import { History } from "./components/History";

function App() {
	return (
		<>
			<h1>Debt-Free Calculator</h1>
			<div className="top">
				<Calculator />
			</div>
			<div className="bottom">
				<History />
			</div>
		</>
	);
}

export default App;
