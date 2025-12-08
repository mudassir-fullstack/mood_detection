import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/Api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

export default function Signup() {
const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6)
      return toast.error("Password too short");

    try {
      const res = await api.post('/api/auth/signup', form);
      login(res.data.token);
      toast.success("Welcome to Mood Genius!");
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
  <div className="d-flex justify-content-center align-itemscenter bg-blend-darken p-4 rounded-3">
  <div className="shadow p-4 bg-white rounded-4 signup-card">

    <p className="text-center mb-4 fs-3">Create Your Account</p>

    <form onSubmit={handleSubmit}>

      {/* Full Name */}
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your full name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="ahmad@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

    {/* Password */}
<div className="mb-3">
  <label className="form-label">Password</label>
  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      placeholder="••••••••"
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      required
    />
    <span
      className="input-group-text"
      style={{ cursor: "pointer" }}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
    </span>
  </div>
</div>

    
      {/* Button */}
      <button type="submit" className="btn btn-primary  btn-create w-100">
        Signup
      </button>
    </form>

    <p className="text-center mt-4 fs-md-5 fs-6">
      Already have an account?
      <Link to="/login" className="ms-1">Login</Link>
    </p>

  </div>
</div>
  
  );
}
