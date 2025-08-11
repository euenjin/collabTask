import { useNavigate } from 'react-router-dom';

function SignInSignUp() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Welcome to CollabTask</h2>
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => navigate('/signin')}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem', cursor: 'pointer' }}
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/signup')}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignInSignUp;
