import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import api from '../services/Api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
const [getData, setGetData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);
      login(res.data.token);
      toast.success("Welcome back!");
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

useEffect(() => {
  document.title = "Login - Mood Genius";
  console.log("Login page loaded");
  const fetchData = async () => {    
  const res = await axios.get('https://mood-detection-mu.vercel.app/api/auth/me');
      if (res.data.success) {
      setGetData(res.data.users);
      console.log(res.data.users);
      }
    };
    fetchData();
}, []);
  return (
  <div className="d-flex justify-content-center align-items-center bg-blend-darken p-4 rounded-3 min-vh-100">
  <div className="shadow p-4 bg-white rounded-4 signup-card">
      <p className="text-center mb-4 fs-3">Welcome Back</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
        <label className="form-label">Email Address</label>      
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
          <div>
            {
              getData && getData.map((item)=>(
                <div key={item.id}>
                  <p>{item.email}</p>
                </div>
              ))
            }
          </div>
      </div>
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

  {/* Forget password link */}
  <div className="text-end mt-1">
    <NavLink to="/forget-password" className="small text-decoration-none">
      Forget password
    </NavLink>
  </div>
</div>

 <button type="submit" className="btn btn-primary  btn-create w-100 ">
        Login
      </button>
        </form>
        <p className="text-center mt-4 fs-md-5 fs-6">
          New here? <Link to="/signup" className="text-purple-600 font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
