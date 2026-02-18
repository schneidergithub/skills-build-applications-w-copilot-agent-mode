import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard/')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Leaderboard</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Team ID</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.team_id}</td>
                <td>{l.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
