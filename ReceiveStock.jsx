import { useState } from 'react';
import axios from 'axios';

export const ReceiveStock = () => {
  const [supplierId, setSupplierId] = useState('');
  const [itemId, setItemId] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleInwardTx = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions/receive', {
        supplier_id: supplierId,
        items: [{ stock_item_id: itemId, quantity_received: parseFloat(qty), unit_price: parseFloat(price) }]
      });
      setStatus('Inbound data verified. Ledger updated successfully.');
      setSupplierId(''); setItemId(''); setQty(''); setPrice('');
    } catch (err) {
      setStatus('Transaction verification validation block failure.');
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Stock Intake Process</h2>
      {status && <div className="mb-6 text-sm font-semibold text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-100">{status}</div>}
      <form onSubmit={handleInwardTx} className="space-y-4">
        <div><label className="block text-sm font-medium text-slate-700">Supplier Key (UUID)</label><input type="text" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={supplierId} onChange={e=>setSupplierId(e.target.value)} required/></div>
        <div><label className="block text-sm font-medium text-slate-700">Stock Target Reference Key (UUID)</label><input type="text" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={itemId} onChange={e=>setItemId(e.target.value)} required/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-slate-700">Intake Volume</label><input type="number" step="0.01" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={qty} onChange={e=>setQty(e.target.value)} required/></div>
          <div><label className="block text-sm font-medium text-slate-700">Unit Cost Valuation</label><input type="number" step="0.01" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={price} onChange={e=>setPrice(e.target.value)} required/></div>
        </div>
        <button type="submit" className="w-full py-3.5 mt-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">COMMIT TRANSACTION</button>
      </form>
    </div>
  );
};