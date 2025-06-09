"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Login() {
  const router = useRouter();
  const [translateX, setTranslateX] = useState(0);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerVerifyPassword, setRegisterVerifyPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const loginValid = loginEmail && loginPassword;
  const registerValid =
    registerUsername &&
    registerEmail &&
    registerPassword &&
    registerVerifyPassword &&
    registerPassword === registerVerifyPassword &&
    isValidEmail(registerEmail);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoginSuccess("Logged in!");
        localStorage.setItem("access_token", data.access_token);
        router.push("/dashboard");
      } else {
        setLoginError(data.detail || "Login failed");
      }
    } catch (err: any) {
      setLoginError("Login error: " + err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterSuccess("Account created!");
      } else {
        setRegisterError(data.detail || "Registration failed");
      }
    } catch (err: any) {
      if (err.message.includes("EMAIL_ALREADY_REGISTERED")) {
        setRegisterError("Email already in use.");
      } else {
        setRegisterError("Registration error: " + err.message);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
        <img
          src="/v882-kul-48-a.jpg"
          alt="Background"
          className="object-cover absolute inset-x-0 bottom-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Sliding Panels */}
      <motion.div
        className="relative z-10 w-[200dvw] flex min-h-screen"
        animate={{ x: `${translateX}%` }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Login Panel */}
        <div className="w-[100dvw] flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full bg-neutral-900/80 backdrop-blur-md rounded-xl p-8 border border-neutral-700 shadow-2xl">
            <h1 className="text-3xl font-bold text-lime-400 mb-2">Welcome Back</h1>
            <p className="text-neutral-300 mb-6">
              No account?{' '}
              <button
                type="button"
                onClick={() => setTranslateX(-50)}
                className="text-lime-400 hover:text-lime-300 transition-colors font-medium"
              >
                Register here
              </button>
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              {loginSuccess && <p className="text-lime-400 text-sm">{loginSuccess}</p>}
              <Button
                type="submit"
                disabled={!loginValid}
                className="w-full bg-lime-600 hover:bg-lime-500 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Login
              </Button>
            </form>
          </div>
        </div>

        {/* Register Panel */}
        <div className="w-[100dvw] flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full bg-neutral-900/80 backdrop-blur-md rounded-xl p-8 border border-neutral-700 shadow-2xl">
            <h1 className="text-3xl font-bold text-lime-400 mb-2">Create Account</h1>
            <p className="text-neutral-300 mb-6">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTranslateX(0)}
                className="text-lime-400 hover:text-lime-300 transition-colors font-medium"
              >
                Login here
              </button>
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={registerVerifyPassword}
                  onChange={(e) => setRegisterVerifyPassword(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              {registerError && <p className="text-red-400 text-sm">{registerError}</p>}
              {registerSuccess && <p className="text-lime-400 text-sm">{registerSuccess}</p>}
              <Button
                type="submit"
                disabled={!registerValid}
                className="w-full bg-lime-600 hover:bg-lime-500 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}