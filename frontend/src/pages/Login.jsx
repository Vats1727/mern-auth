import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      setMsg("Logged in — redirecting...");
      if (onAuth) await onAuth();
      setTimeout(() => nav("/dashboard"), 600);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div><input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
