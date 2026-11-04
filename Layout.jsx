import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Package, ArrowDownLeft, ArrowUpRight, BarChart3, LogOut } from 'lucide-react';

export const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 font-bold text-lg border-b border-slate-800 text-amber-500 tracking-wider">
          APPEC SSMS PANEL
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800"><LayoutDashboard size={18}/> <span>Dashboard</span></Link>
          <Link to="/stock" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800"><Package size={18}/> <span>Stock Items</span></Link>
          <Link to="/receive" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800"><ArrowDownLeft size={18}/> <span>Receive Intake</span></Link>
          <Link to="/issue" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800"><ArrowUpRight size={18}/> <span>Issue Material</span></Link>
          <Link to="/analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800"><BarChart3 size={18}/> <span>AI Projections</span></Link>
        </nav>
        <div className="p-4 border-t border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <p className="font-semibold text-slate-200 text-sm">{user?.username}</p>
            <p className="text-amber-500 text-xs font-mono">{user?.role}</p>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }} className="text-slate-400 hover:text-white p-1">
            <LogOut size={18}/>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};