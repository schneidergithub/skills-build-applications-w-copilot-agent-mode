import React, { useEffect, useState } from 'react';

// Codespace API endpoint example: https://$CODESPACE_NAME-8000.app.github.dev/api/teams
const CODESPACE_BASE = process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev` : '';

export default function Teams() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${CODESPACE_BASE || ''}/api/teams/`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Teams</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
