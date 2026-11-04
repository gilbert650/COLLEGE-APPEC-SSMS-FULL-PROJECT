import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { StockItems } from './pages/StockItems';
import { ReceiveStock } from './pages/ReceiveStock';
import { IssueStock } from './pages/IssueStock';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="stock" element={<StockItems />} />
            <Route path="receive" element={<ProtectedRoute roles={['SUPER_ADMIN', 'STORE_MANAGER']}><ReceiveStock /></ProtectedRoute>} />
            <Route path="issue" element={<ProtectedRoute roles={['SUPER_ADMIN', 'STORE_MANAGER']}><IssueStock /></ProtectedRoute>} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}