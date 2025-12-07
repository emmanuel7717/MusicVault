import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await loginUser(form);
      setMessage(res.data.message || "OTP sent to your email.");
      localStorage.setItem("pendingEmail", form.email);
      setTimeout(() => navigate("/verify-otp"), 800);
    } catch (err) {
      console.log(err);
      setMessage(
        err.response?.data?.message || "Login failed. Please check your details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Sending OTP..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
