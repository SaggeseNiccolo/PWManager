import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../src/firebase";
import Spinner from "./Spinner";
import "./Login.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error.message);
		}
	};

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithRedirect(auth, provider);
			const user = result.user;
			console.log(user);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				navigate("/");
			}
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-1 bg-gray-800 text-gray-200 h-screen items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="login">
			<div className="login__container rounded-xl">
				<input
					type="text"
					className="login__textBox rounded-xl"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					className="login__textBox rounded-2xl"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<div className="flex justify-around">
					<button className="login__btn login__google rounded-2xl transition-all hover:bg-blue-700 hover:font-semibold hover:rounded-3xl w-1/2 m-2" onClick={signInWithGoogle}>
						Google
					</button>
					<button
						className="login__btn rounded-2xl transition-all hover:bg-gray-800 hover:font-semibold hover:rounded-3xl w-1/2 m-2"
						onClick={login}
					>
						Login
					</button>
				</div>
				{/* <div>
					<Link to="/reset">Forgot Password</Link>
				</div> */}
				<div>
					Don't have an account? <Link to="/register" className="font-semibold transition-all hover:text-blue-600">Register now</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
