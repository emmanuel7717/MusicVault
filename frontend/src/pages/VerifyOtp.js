import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/authApi";

function VerifyOtp({ onLogin }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("pendingEmail") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("No email found for verification. Please login again.");
      return;
    }

    if (!otp) {
      setMessage("Please enter the OTP code.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await verifyOtp({ email, otp });
      const { token, user } = res.data;

      localStorage.removeItem("pendingEmail");
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (onLogin) onLogin(user);

      setMessage("Login successful.");
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      console.log(err);
      setMessage(
        err.response?.data?.message || "OTP verification failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {email && <p>We sent a code to: {email}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            OTP
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </label>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
