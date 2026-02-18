import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/workouts/')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Workouts</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map(w => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>{w.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
