import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/activities/')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Activities</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Workout ID</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.user_id}</td>
                <td>{a.workout_id}</td>
                <td>{a.date}</td>
                <td>{a.duration_minutes}</td>
                <td>{a.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
