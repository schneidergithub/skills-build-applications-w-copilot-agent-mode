import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/teams/')
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
