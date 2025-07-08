import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Prospects from './pages/Prospects';
import Clients from './pages/Clients';
import Invoices from './pages/Invoices';
import Quotes from './pages/Quotes';
import Logs from './pages/Logs';

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/prospects">Prospects</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/quotes">Quotes</Link>
        <Link to="/invoices">Invoices</Link>
        <Link to="/logs">Logs</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prospects" element={<Prospects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
