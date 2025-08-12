// src/pages/SignIn.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 필요한 경우 credentials 추가: credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      // 응답이 JSON이 아닐 수도 있으니 방어적으로 처리
      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (!res.ok) {
        const msg = data?.message || (res.status === 401 ? 'Invalid email or password' : 'Sign in failed');
        throw new Error(msg);
      }

      // 성공 처리
      if (data?.token) localStorage.setItem('token', data.token);
      // 이후 요청에서 사용할 base 예시:
      // fetch('/api/xxx', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      nav('/todo'); // 성공 후 이동할 경로
    } catch (e) {
      setErr(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-sky-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-6">
        <h2 className="font-kotta text-center text-2xl font-medium mb-4">Sign in</h2>

        {err && (
          <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-left">
            <span className="block text-sm mb-1 text-slate-700">Email</span>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="block text-left">
            <span className="block text-sm mb-1 text-slate-700">Password</span>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl px-5 py-3 font-semibold shadow bg-cyan-300 hover:bg-cyan-200 active:translate-y-px disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <a href="/forgot" className="hover:underline">Forgot your password?</a>
          <a href="/signup" className="hover:underline">Create Account</a>
        </div>
      </div>
    </div>
  );
}
