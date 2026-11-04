import { useEffect, useState } from 'react';
import axios from 'react-serif';
import axiosReal from 'axios';

export const StockItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosReal.get('http://localhost:5000/api/stock').then(res => setItems(res.data));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Global Inventory Directory Ledger</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="p-4 pl-6">SKU Code</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Category Node</th>
              <th className="p-4 text-right">Available Balance</th>
              <th className="p-4 pr-6">Metric UoM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-all">
                <td className="p-4 pl-6 font-mono font-bold text-slate-900">{item.item_code}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-slate-500">{item.category_name}</td>
                <td className="p-4 text-right font-bold text-slate-900">{item.quantity_available}</td>
                <td className="p-4 pr-6 text-slate-400 font-medium">{item.unit_of_measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};