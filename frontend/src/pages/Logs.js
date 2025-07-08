import React, { useEffect, useState } from 'react';

function Logs() {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.text())
      .then(setLogs)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>Application Logs</h2>
      <pre style={{whiteSpace: 'pre-wrap'}}>{logs}</pre>
    </div>
  );
}

export default Logs;


