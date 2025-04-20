"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GridBox from "./GridBox";
import { motion } from "framer-motion";

export default function Login() {
	const router = useRouter();

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerVerifyPassword, setRegisterVerifyPassword] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");

	const [loginError, setLoginError] = useState("");
	const [registerError, setRegisterError] = useState("");
	const [loginSuccess, setLoginSuccess] = useState("");
	const [registerSuccess, setRegisterSuccess] = useState("");

	const [translateX, setTranslateX] = useState(0);

	const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const login_valid = loginEmail.trim() !== "" && loginPassword.trim() !== "";
	const register_valid =
		registerUsername.trim() !== "" &&
		registerPassword.trim() !== "" &&
		registerVerifyPassword.trim() !== "" &&
		registerEmail.trim() !== "" &&
		registerPassword === registerVerifyPassword &&
		isValidEmail(registerEmail);

	const handleLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoginError("");
		setLoginSuccess("");
		try {
			const response = await fetch("http://localhost:8000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: loginEmail, password: loginPassword }),
			});
			const data = await response.json();
			if (response.ok) {
				setLoginSuccess("Login successful!");
				router.push("/dashboard");
			} else {
				setLoginError(data.detail || "Login failed");
			}
		} catch (error: any) {
			setLoginError("Login failed: " + error.message);
		}
	};

	const handleRegisterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setRegisterError("");
		setRegisterSuccess("");
		try {
			const response = await fetch("http://localhost:8000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: registerUsername,
					email: registerEmail,
					password: registerPassword,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				setRegisterSuccess("Registration successful!");
			} else {
				setRegisterError(data.detail || "Registration failed");
			}
		} catch (error: any) {
			setRegisterError("Registration failed: " + error.message);
			if(error.message === "Failed to fetch") {
				setRegisterError("Server is not reachable. Please check your connection.");
			} else if(error.message === "NetworkError when attempting to fetch resource.") {
				setRegisterError("Network error. Please check your connection.");
			} else if(error.message === "EMAIL_ALREADY_REGISTERED."){
				setRegisterError("Email already registered. Please use a different email.");
			} else {
				setRegisterError("Registration failed: " + error.message);
			}
		}
	};

	return (
	<GridBox rows={8} cols={25} rowColors={['bef2640', '#4d7c0f']} colColors={['bef264', '#4d7c0f']} duration={4} className="flex flex-row w-[200dvw]" >
		<motion.div className="min-h-screen w-[200dvw] overflow-hidden flex flex-row bg-transparent text-white font-sans items-start pt-24"
		style = {{ x: `${translateX}%` }} transition={{ type:"tween", ease: "easeInOut", duration: 1.5  }}>
			{/* Login Side */}
			<div className="w-1/2 px-6 flex flex-col justify-center items-center bg-transparent border-r border-lime-800/5 shadow-xl">
				<h1 className="text-3xl font-light text-muted-foreground tracking-tight text-lime-500 drop-shadow-[0_0_14px_#84cc16]">Access your account</h1>
				<p className="text-lg font-light text-center text-gray-400 mb-6">First time here? Register for free <a className="text-lime-500 hover:underline" onClick={() => setTranslateX(-50)}>here</a>.</p>
	
				<form
					className="w-full flex flex-col gap-4 max-w-md backdrop-blur-sm bg-black/30 border border-lime-400/35 rounded-2xl p-10 shadow-[0_0_20px_#00000066]"
					onSubmit={handleLoginSubmit}
				>
					<h2 className="text-2xl font-semibold text-center mb-8 text-lime-500">User Login</h2>
	
					<input
						type="email"
						placeholder="Email"
						className="bg-white/15 text-zinc-300 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500"
						value={loginEmail}
						onChange={(e) => setLoginEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="bg-white/15 text-zinc-300 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500"
						value={loginPassword}
						onChange={(e) => setLoginPassword(e.target.value)}
					/>
	
					{loginError && <p className="text-red-500 mb-2 text-sm">{loginError}</p>}
					{loginSuccess && <p className="text-lime-400 mb-2 text-sm">{loginSuccess}</p>}
	
					<button
						type="submit"
						disabled={!login_valid}
						className={`px-2 py-1.5 flex gap-2 items-center justify-center rounded-lg ${login_valid ? 'bg-gradient-to-br from-zinc-700 to bg-zinc-900 border border-b-2 border-r-2 border-l-0 border-t-0 border-lime-700 text-lime-500 hover:text-lime-400 hover:border-lime-600 transition' :'bg-gradient-to-br from-zinc-700 to bg-zinc-900 border border-b-2 border-r-2 border-l-0 border-t-0 border-neutral-700 text-neutral-500 hover:text-neutral-400 hover:border-neutral-600 transition cursor-not-allowed'}`}
					>
						    <div className="relative flex items-center justify-center size-3">
                  <div className={`absolute blur-xl size-2 outline outline-2 rounded-full ${login_valid ? 'bg-lime-500 outline-lime-900 ':'bg-red-500 outline-red-900 '}`}></div>
                  <div className={`absolute size-2 outline outline-3 rounded-full ${login_valid ? 'bg-lime-500 outline-lime-900 ':'bg-red-500 outline-red-900 '}`}></div>
                </div>
								<div className=" flex text-center items-center justify-center">Login</div>
					</button>
	
					<div className="flex justify-between items-center mt-6 text-sm text-gray-400">
						<label className="flex items-center justify-center gap-2">
							<input type="checkbox" className="accent-lime-500 translate-y-px bg-zinc-300/35 rounded-full" />
							Remember me
						</label>
						<a href="#" className="text-lime-500 hover:underline">
							Forgot password?
						</a>
					</div>
				</form>
			</div>
	
			{/* Register Side */}
			<div className="w-1/2 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-light text-muted-foreground tracking-tight text-lime-500 drop-shadow-[0_0_14px_#84cc16]">Welcome to Cryptica</h1>
			<p className="text-lg font-light text-center text-gray-400 mb-6">Already registered? Connect to your account <a className="text-lime-500 hover:underline" onClick={() => setTranslateX(-0)}>here</a>.</p>
			<form
					className="w-full max-w-md backdrop-blur-md bg-black/30 border border-lime-400/35 rounded-2xl p-10 shadow-[0_0_20px_#00000066] flex flex-col gap-4"
					onSubmit={handleRegisterSubmit}
				>
					<h2 className="text-2xl font-semibold text-center mb-8 text-lime-500">Create an Account</h2>
	
					<input
						type="text"
						placeholder="Username"
						className="bg-white/15 text-zinc-300 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500" 
						value={registerUsername}
						onChange={(e) => setRegisterUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="bg-white/15 text-zinc-300 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500"
						value={registerPassword}
						onChange={(e) => setRegisterPassword(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Verify Password"
						className="bg-white/15 text-zinc-300 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500"
						value={registerVerifyPassword}
						onChange={(e) => setRegisterVerifyPassword(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						className={`bg-white/15 text-zinc-300 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-lime-500 ${
							registerError === 'Email already registered. Please use a different email.' ? 'ring-2 ring-red-600' : ''
						}`}
						value={registerEmail}
						onChange={(e) => setRegisterEmail(e.target.value)}
					/>
	
					{registerError && <p className="text-red-500 mb-2 text-sm">{registerError}</p>}
					{registerSuccess && <p className="text-lime-400 mb-2 text-sm">{registerSuccess}</p>}
	
					<button
						type="submit"
						disabled={!register_valid}
						className={`px-2 py-1.5 flex gap-2 justify-center items-center rounded-lg mt-4 ${register_valid ? 'bg-gradient-to-br from-zinc-700 to bg-zinc-900 border border-b-2 border-r-2 border-l-0 border-t-0 border-lime-700 text-lime-500 hover:text-lime-400 hover:border-lime-600 transition' : 'bg-gradient-to-br from-zinc-700 to bg-zinc-900 border border-b-2 border-r-2 border-l-0 border-t-0 border-neutral-700 text-neutral-500 hover:text-neutral-400 hover:border-neutral-600 transition cursor-not-allowed'}`}
					>
						  <div className="relative flex items-center justify-center size-3 right-0">
                <div className={`absolute blur-xl size-2 outline outline-2 rounded-full ${register_valid ? 'bg-lime-500 outline-lime-900 ':'bg-red-500 outline-red-900 '}`}></div>
                <div className={`absolute size-2 outline outline-3 rounded-full ${register_valid ? 'bg-lime-500 outline-lime-900 ':'bg-red-500 outline-red-900 '}`}></div>
              </div>
							<div className=" flex text-center items-center justify-center">Register</div>
					</button>
					<p className="text-sm mt-6 text-gray-400 text-center">
						By signing up, you agree to our{' '}
						<a href="#" className="text-lime-500 hover:underline">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="#" className="text-lime-500 hover:underline">
							Privacy Policy
						</a>
						.
					</p>
				</form>
				
			</div>
		</motion.div>
	</GridBox>
	);
	
}
