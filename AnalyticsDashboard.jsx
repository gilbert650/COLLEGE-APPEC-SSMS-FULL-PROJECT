import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/analytics/dashboard')
      .then(res => setAnalytics(res.data.payload))
      .catch(err => console.error(err));
  }, []);

  if (!analytics) return <div className="p-8 font-medium text-slate-500">Querying live telemetry from python engine clusters...</div>;

  const chartData = Object.keys(analytics.replenishment_forecast).map(code => ({
    sku: code,
    Requirement: analytics.replenishment_forecast[code]
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Python Service Intelligence Layer</h1>
        <p className="text-sm text-slate-500 mt-1">Statistical projections calculated from moving usage matrices</p>
      </div>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4">Calculated 30-Day Resource Safety Replenishment Quantities</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="sku" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Requirement" fill="#D97706" name="Projected Volume Needs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4">Real-Time Safe Stock Threshold Breach Warnings</h3>
        <div className="grid grid-cols-1 gap-3">
          {analytics.low_stock_items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-red-50/60 border border-red-100 p-4 rounded-xl">
              <span className="font-semibold text-slate-900">{item.name} ({item.code})</span>
              <span className="text-sm text-red-600 font-mono font-bold">Current: {item.available} / Min Level: {item.min}</span>
            </div>
          ))}
          {analytics.low_stock_items.length === 0 && (
            <p className="text-sm font-semibold text-emerald-600 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">All available volume states remain balanced securely above base limits.</p>
          )}
        </div>
      </div>
    </div>
  );
};