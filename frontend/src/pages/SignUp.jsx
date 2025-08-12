import { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const teamOptions = ['Solo', 'Other']; 
  const departmentOptions = ['Solo', 'Planning&Presentation', 'Research','Leadership', 'Other']; // Example team options


  const [team, setTeam] = useState('Solo');
  const [customTeam, setCustomTeam] = useState('');


  const [department, setDepartment] = useState('Solo');
  const [customDepartment, setCustomDepartment] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalTeam =team === 'Other' ? customTeam : team;
    const finalDepartment = department === 'Other' ? customDepartment : department;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, team:finalTeam, department: finalDepartment }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Sign Up failed');
      } else {
        //Save token after successful signup
        localStorage.setItem('token', data.token);
        alert('Signed up!');
        // TODO: 회원가입 후 페이지 이동 등 처리
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <label>Team:</label>
      <select value={team} onChange={(e) => setTeam(e.target.value)}>
        {teamOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select><br />

      {team === 'Other' && (
        <input
          type="text"
          placeholder="Custom team"
          value={customTeam}
          onChange={(e) => setCustomTeam(e.target.value)}
          required
        />
      )}<br />

      <label>Department:</label>
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        {departmentOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select><br />

      {department === 'Other' && (
        <input
          type="text"
          placeholder="Custom department"
          value={customDepartment}
          onChange={(e) => setCustomDepartment(e.target.value)}
          required
        />
      )}<br />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
