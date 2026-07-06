import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, signupAsync } from "../redux/authSlice";
import loginSchema from "../validation/loginSchema";
import signupSchema from "../validation/signupSchema";

import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authError = useSelector((state) => state.auth.error);
    const [isLogin, setIsLogin] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(isLogin ? loginSchema : signupSchema)
    });

    const toggleMode = () => {
        setIsLogin(!isLogin);
        reset();
    };

    async function onSubmit(data) {
        if (isLogin) {
            const result = await dispatch(loginAsync({ email: data.email, password: data.password }));
            if (loginAsync.fulfilled.match(result)) {
                navigate("/dashboard");
            } else if (result.payload && typeof result.payload === "string" && result.payload.includes("Account not found")) {
                setIsLogin(false);
            }
        } else {
            const result = await dispatch(signupAsync(data));
            if (signupAsync.fulfilled.match(result)) {
                navigate("/dashboard");
            }
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>PRCM System</h1>
            <p className="subtitle">
                {isLogin ? "Procurement Risk & Compliance Management" : "Create a new account"}
            </p>

            {!isLogin && (
                <>
                    <input
                        className="input-box"
                        type="text"
                        placeholder="Full Name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="error">{errors.name.message}</p>
                    )}
                </>
            )}

            <input
                className="input-box"
                type="email"
                placeholder="Enter Email"
                {...register("email")}
            />
            {errors.email && (
                <p className="error">{errors.email.message}</p>
            )}

            <input
                className="input-box"
                type="password"
                placeholder="Password"
                {...register("password")}
            />
            {errors.password && (
                <p className="error">{errors.password.message}</p>
            )}

            {!isLogin && (
                <>
                    <select className="input-box" {...register("role")}>
                        <option value="">Select Role</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Procurement Manager">Procurement Manager</option>
                        <option value="Employee">Employee</option>
                        <option value="Auditor">Auditor</option>
                    </select>
                    {errors.role && (
                        <p className="error">{errors.role.message}</p>
                    )}
                </>
            )}

            {authError && (
                <p className="error">{authError}</p>
            )}

            <button className="login-btn">
                {isLogin ? "Login" : "Sign Up"}
            </button>

            <div style={{ textAlign: "center", marginTop: "12px" }}>
                {isLogin ? (
                    <>
                        <p><Link to="/forgot-password">Forgot Password?</Link></p>
                        <p style={{ marginTop: "12px" }}>
                            Don't have an account?{" "}
                            <span 
                                style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }} 
                                onClick={toggleMode}
                            >
                                Sign Up
                            </span>
                        </p>
                    </>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span 
                            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }} 
                            onClick={toggleMode}
                        >
                            Login
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
}

export default Login;