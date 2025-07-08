import React, { useEffect, useState } from 'react';

function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const load = () => {
    fetch('/api/clients')
      .then((res) => res.json())
      .then(setClients)
      .catch(() => {});
  };

  useEffect(load, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(load);
  };

  return (
    <div>
      <h2>Clients</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {clients.map((p) => (
          <li key={p.id}>{p.name} - {p.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;
