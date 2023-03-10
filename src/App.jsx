import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;