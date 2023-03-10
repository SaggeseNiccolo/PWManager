import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase";
import "./Register.css";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const register = async () => {
		try {
			if (password !== confirmPassword) {
				alert("Passwords do not match");
				return;
			}
			const user = await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (auth.currentUser) {
			navigate("/");
		}
	}, [auth.currentUser]);

	return (
		<div className="register">
			<div className="register__container">
				<input
					type="email"
					className="register__textBox"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					className="register__textBox"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<input
					type="password"
					className="register__textBox"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Password"
				/>
				<button className="register__btn" onClick={register}>
					Register
				</button>
				{/* <button
					className="register__btn register__google"
					onClick={signInWithGoogle}
				>
					Register with Google
				</button> */}
				<div>
					Already have an account? <Link to="/login">Login</Link> now.
				</div>
			</div>
		</div>
	);
}

export default Register;
