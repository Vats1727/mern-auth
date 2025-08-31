import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register({ onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", form);
      setMsg("Registered — redirecting to dashboard...");
      if (onAuth) await onAuth();
      setTimeout(() => nav("/dashboard"), 800);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div><input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div><input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
