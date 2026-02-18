import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">OctoFit Tracker</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="mb-4">
          <h1 className="h3">OctoFit Tracker Dashboard</h1>
          <p className="text-muted">Browse users, teams, workouts, activities and leaderboard.</p>
        </div>

        <Routes>
          <Route path="/" element={<div className="card p-4">Welcome to OctoFit Tracker</div>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
