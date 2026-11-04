import { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stock').then(res => setItems(res.data)).catch(err=>console.error(err));
  }, []);

  const outOfStock = items.filter(i => parseFloat(i.quantity_available) === 0).length;
  const lowStock = items.filter(i => parseFloat(i.quantity_available) <= parseFloat(i.minimum_stock_level) && parseFloat(i.quantity_available) > 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Operation Node</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time telemetry analysis of College APPEC inventory states</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p className="text-sm font-semibold text-slate-500">Tracked Line Items</p><p className="text-4xl font-bold mt-2 text-slate-900">{items.length}</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p className="text-sm font-semibold text-slate-500">Low Stock Breaches</p><p className="text-4xl font-bold mt-2 text-amber-600">{lowStock}</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p className="text-sm font-semibold text-slate-500">Depleted Resource Rows</p><p className="text-4xl font-bold mt-2 text-red-600">{outOfStock}</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p className="text-sm font-semibold text-slate-500">Active Campus Sectors</p><p className="text-4xl font-bold mt-2 text-slate-900">7</p></div>
      </div>
    </div>
  );
};