// src/pages/SignUp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOLO = 'Solo';
const OTHER = 'Other';

function sanitizeName(input) {
  // Trim, collapse multiple spaces, allow only letters (Unicode), numbers, space, &, -, _
  let out = input.trim().replace(/\s+/g, ' ');
  out = out.replace(/[^\p{L}\p{N}&\-_ ]/gu, '');
  if (out.length > 50) out = out.slice(0, 50);
  return out;
}

export default function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const teamOptions = [SOLO, OTHER];
  const departmentOptions = [SOLO, 'Planning&Presentation', 'Research', 'Leadership', OTHER];

  const [team, setTeam] = useState(SOLO);
  const [customTeam, setCustomTeam] = useState('');

  const [department, setDepartment] = useState(SOLO);
  const [customDepartment, setCustomDepartment] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Enforce allowed pairs when team changes
  function handleTeamChange(value) {
    setTeam(value);
    if (value === SOLO) {
      setDepartment(SOLO);
      setCustomDepartment('');
    } else {
      if (department === SOLO) setDepartment('Planning&Presentation');
    }
  }

  // Enforce allowed pairs when department changes
  function handleDeptChange(value) {
    setDepartment(value);
    if (value === SOLO) {
      setTeam(SOLO);
      setCustomTeam('');
    } else {
      if (team === SOLO) setTeam(OTHER);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Normalize base fields
    const emailNorm = email.trim().toLowerCase();
    const passwordNorm = password.trim();

    // Validate email (simple pattern)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm);
    if (!emailOk) {
      setLoading(false);
      return setError('Please enter a valid email address.');
    }

    // Password policy (min 8; at least 1 letter + 1 number)
    if (passwordNorm.length < 8 || !/[A-Za-z]/.test(passwordNorm) || !/\d/.test(passwordNorm)) {
      setLoading(false);
      return setError('Password must be at least 8 characters and include letters and numbers.');
    }

    // Normalize customs
    const customTeamNorm = sanitizeName(customTeam);
    const customDeptNorm = sanitizeName(customDepartment);

    // Cross-rule check: (Solo, Solo) or (Not-Solo, Not-Solo)
    const pairSolo = team === SOLO && department === SOLO;
    const pairBoth = team !== SOLO && department !== SOLO;
    if (!pairSolo && !pairBoth) {
      setLoading(false);
      return setError('Team/Department must both be Solo or both be non-Solo.');
    }

    // Required customs when "Other" selected
    if (team === OTHER && !customTeamNorm) {
      setLoading(false);
      return setError('Please provide a custom Team name.');
    }
    if (department === OTHER && !customDeptNorm) {
      setLoading(false);
      return setError('Please provide a custom Department name.');
    }

    const finalTeam = team === OTHER ? customTeamNorm : team;
    const finalDepartment = department === OTHER ? customDeptNorm : department;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailNorm,
          password: passwordNorm,
          team: finalTeam,
          department: finalDepartment,
        }),
      });

      let data = {};
    try { data = await response.json(); } catch {}
      if (!response.ok) {
        throw new Error(data?.message || 'Sign Up failed');
      }

      if (data?.token) localStorage.setItem('token', data.token);
        alert('Signed up!');
        setLoading(false);

      nav('/signin', { replace: true, state: { emailPrefill: emailNorm } });
      return;

    } catch (err) {
      setError(err.message || 'Network error');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-lg p-8 sm:p-10">
        <h1 className="font-kotta text-3xl sm:text-4xl text-center text-slate-900 mb-6">Sign Up</h1>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block font-kotta italic text-lg text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full h-12 rounded-2xl border border-slate-300 bg-slate-100 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-kotta italic text-lg text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full h-12 rounded-2xl border border-slate-300 bg-slate-100 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </div>

          {/* Team */}
          <div>
            <label className="block font-kotta italic text-lg text-slate-700 mb-2">Team</label>
            <select
              value={team}
              onChange={(e) => handleTeamChange(e.target.value)}
              className="w-full h-12 rounded-2xl border border-slate-300 bg-slate-100 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              {teamOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {team === OTHER && (
              <input
                type="text"
                placeholder="Custom team"
                value={customTeam}
                onChange={(e) => setCustomTeam(sanitizeName(e.target.value))}
                className="mt-3 w-full h-12 rounded-2xl border border-slate-300 bg-slate-100 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-200"
                required
              />
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block font-kotta italic text-lg text-slate-700 mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="w-full h-12 rounded-2xl border border-slate-300 bg-slate-100 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              {departmentOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {department === OTHER && (
              <input
                type="text"
                placeholder="Custom department"
                value={customDepartment}
                onChange={(e) => setCustomDepartment(sanitizeName(e.target.value))}
                className="mt-3 w-full h-12 rounded-2xl border border-slate-300 bg-slate-100 px-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-200"
                required
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-cyan-300 hover:bg-cyan-200 active:translate-y-px font-kotta font-semibold text-lg text-slate-900 shadow disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
