import React, { useEffect, useState } from 'react';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [form, setForm] = useState({ client_id: '', amount: '', status: '' });

  const load = () => {
    fetch('/api/quotes')
      .then((res) => res.json())
      .then(setQuotes)
      .catch(() => {});
  };

  useEffect(load, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
    }).then(load);
  };

  return (
    <div>
      <h2>Quotes</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Client ID" value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })} />
        <input placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <input placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {quotes.map((i) => (
          <li key={i.id}>{i.client_id} - {i.amount} - {i.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Quotes;
