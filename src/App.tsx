import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Clients from './pages/Clients';
import Quotations from './pages/Quotations';
import CoverNotes from './pages/CoverNotes';
import TaxInvoices from './pages/TaxInvoices';
import Receipts from './pages/Receipts';
import Marketing from './pages/Marketing';
import Renewals from './pages/Renewals';
import Commissions from './pages/Commissions';
import Cancellations from './pages/Cancellations';
import Claims from './pages/Claims';
import Reports from './pages/Reports';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/cover-notes" element={<CoverNotes />} />
          <Route path="/tax-invoices" element={<TaxInvoices />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/renewals" element={<Renewals />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/cancellations" element={<Cancellations />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;