import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useLang } from '../i18n/LanguageContext';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useLang();
  const a = t.auth;
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Return to the page that sent the visitor here, if any.
  const from = (location.state as { from?: string } | null)?.from || '/matches';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await onLogin(email, password);
    setSubmitting(false);
    if (!ok) {
      setError(a.invalidCredentials);
      return;
    }
    navigate(from, { replace: true });
  };

  const labelClasses = "text-[10px] font-bold text-neutral-400 tracking-widest uppercase";
  const inputClasses = "w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 text-sm focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 outline-none transition-all shadow-sm dark:text-white";

  return (
    <div className="h-full overflow-y-auto bg-neutral-50 dark:bg-[#0a0a0a] flex items-start sm:items-center justify-center p-4 sm:p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-[#121212] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-8 space-y-6 shadow-sm animate-in my-8">
        <div className="flex justify-center">
          <Logo size="sm" />
        </div>
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">{a.loginTitle}</h1>
          <p className="text-sm text-neutral-500 font-light">{a.loginSubtitle}</p>
        </header>

        <div className="space-y-2">
          <label htmlFor="login-email" className={labelClasses}>{a.email}</label>
          <input id="login-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} autoFocus />
        </div>
        <div className="space-y-2">
          <label htmlFor="login-password" className={labelClasses}>{a.password}</label>
          <input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={inputClasses} />
        </div>

        {error && <p role="alert" className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-[12px] font-bold tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50"
        >
          {a.submit}
        </button>

        <p className="text-sm text-center text-neutral-500">
          {a.noAccount}{' '}
          <Link to="/onboarding" className="text-teal-600 hover:underline font-medium">{a.register}</Link>
        </p>
        <p className="text-[11px] text-center text-neutral-400">{a.prototypeNote}</p>
      </form>
    </div>
  );
};
