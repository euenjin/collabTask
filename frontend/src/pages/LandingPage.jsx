// pages/LandingPage.jsx
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>CollabTask</h1>
      <p>Do not know how to collaborate? We are here to work together with YOU</p>
      <p
        style={{ marginTop: '4rem', fontSize: '0.8rem', color: 'gray', cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => navigate('/signin-signup')}
      >
        click to continue
      </p>
    </div>
  );
}

export default LandingPage;
