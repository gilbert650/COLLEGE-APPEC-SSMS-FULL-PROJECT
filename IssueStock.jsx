import { useState } from 'react';
import axios from 'axios';

export const IssueStock = () => {
  const [deptId, setDeptId] = useState('');
  const [receiver, setReceiver] = useState('');
  const [purpose, setPurpose] = useState('');
  const [itemId, setItemId] = useState('');
  const [qty, setQty] = useState('');
  const [msg, setMsg] = useState('');

  const handleOutwardTx = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions/issue', {
        department_id: parseInt(deptId),
        receiver_name: receiver,
        purpose,
        items: [{ stock_item_id: itemId, quantity_issued: parseFloat(qty) }]
      });
      setMsg('Asset allocation dispatched cleanly.');
      setDeptId(''); setReceiver(''); setPurpose(''); setItemId(''); setQty('');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Execution sequence aborted due to constraints.');
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Material Allocation Dispersal</h2>
      {msg && <div className="mb-6 text-sm font-semibold text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-100">{msg}</div>}
      <form onSubmit={handleOutwardTx} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-slate-700">Department Index Node</label><input type="number" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={deptId} onChange={e=>setDeptId(e.target.value)} required/></div>
          <div><label className="block text-sm font-medium text-slate-700">Receiver Faculty Name</label><input type="text" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={receiver} onChange={e=>setReceiver(e.target.value)} required/></div>
        </div>
        <div><label className="block text-sm font-medium text-slate-700">Functional Purpose Statement</label><input type="text" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={purpose} onChange={e=>setPurpose(e.target.value)} required/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-slate-700">Asset UUID Target</label><input type="text" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={itemId} onChange={e=>setItemId(e.target.value)} required/></div>
          <div><label className="block text-sm font-medium text-slate-700">Dispersal Allocation Qty</label><input type="number" step="0.01" className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none" value={qty} onChange={e=>setQty(e.target.value)} required/></div>
        </div>
        <button type="submit" className="w-full py-3.5 mt-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">DISPATCH INVENTORY BLOCK</button>
      </form>
    </div>
  );
};