import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (e) {
      setErr('Invalid authentication payload signature parameters.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 text-center">College APPEC</h2>
          <p className="text-sm text-slate-500 text-center mt-1">Stock Management Infrastructure Access Portal</p>
        </div>
        {err && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">{err}</div>}
        <div>
          <label className="block text-sm font-semibold text-slate-700">System Identity</label>
          <input type="text" required value={username} onChange={e=>setUsername(e.target.value)} className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Security Phrase</label>
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all"/>
        </div>
        <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 tracking-wider font-semibold transition-all shadow-lg">AUTHORIZE SECURITY HANDLE</button>
      </form>
    </div>
  );
};