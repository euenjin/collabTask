import { useNavigate } from 'react-router-dom';

function SignInSignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid place-items-center bg-sky-50 px-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow p-6 text-center">
        <h2 className="font-kotta text-2xl font-medium">Welcome to CollabTask</h2>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate('/signin')}
            className="rounded-2xl px-5 py-3 font-semibold shadow bg-cyan-300 hover:bg-cyan-200 active:translate-y-px"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="rounded-2xl px-5 py-3 font-semibold shadow bg-violet-300 hover:bg-violet-200 active:translate-y-px"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInSignUp;
