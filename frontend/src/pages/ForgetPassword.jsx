import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/auth/forget-password", {
        email,
        newPassword,
      });

      toast.success("Password updated successfully");
      setEmail("");
      setNewPassword("");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
<div className="d-flex justify-content-center align-items-center bg-blend-darken p-4 rounded-3 min-vh-100">
  <div className="shadow p-4 bg-white rounded-4 signup-card">
    <p className="text-center mb-4 fs-3">Reset Password</p>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100">
          Update Password
        </button>
      </form>
</div>
    </div>
  );
}
