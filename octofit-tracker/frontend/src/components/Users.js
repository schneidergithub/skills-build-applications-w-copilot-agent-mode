import React, { useEffect, useState } from 'react';

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/users/')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Users</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Team ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td><a href={`mailto:${u.email}`}>{u.email}</a></td>
                <td>{u.team_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
