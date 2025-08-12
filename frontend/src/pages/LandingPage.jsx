import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen grid place-items-center bg-sky-50 px-4 text-center">
      <div className="max-w-2xl w-full">
        <h1 className="font-kotta text-4xl sm:text-5xl tracking-wide">CollabTask</h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-900 leading-relaxed">
          Do not know how to collaborate? We are here to work together with <b>YOU</b>
        </p>

        <p
          className="mt-16 text-xs text-slate-500 underline cursor-pointer hover:text-slate-700"
          onClick={() => navigate('/signin-signup')}
        >
          click to continue
        </p>
      </div>
    </main>
  );
}

export default LandingPage;

