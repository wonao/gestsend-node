import React, { useEffect, useState } from 'react';

function Prospects() {
  const [prospects, setProspects] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const load = () => {
    fetch('/api/prospects')
      .then((res) => res.json())
      .then(setProspects)
      .catch(() => {});
  };

  useEffect(load, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/prospects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(load);
  };

  return (
    <div>
      <h2>Prospects</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {prospects.map((p) => (
          <li key={p.id}>{p.name} - {p.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Prospects;
