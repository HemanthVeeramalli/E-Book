import React from 'react';
import './Stats.css';

const Stats = ({ stats, total }) => (
  <div className="stats-container">
    <h2 className="stats-title">Statistics Overview</h2>
    <div className="stats-grid">
      <div className="stat-box">
        <span className="stat-label">Total Results:</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Most Common Author:</span>
        <span className="stat-value">{stats.mostCommonAuthor || 'N/A'}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Earliest Publication:</span>
        <span className="stat-value blue">{stats.earliest || 'Unknown'}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Latest Publication:</span>
        <span className="stat-value green">{stats.latest || 'Unknown'}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Server Response Time:</span>
        <span className={`stat-value ${stats.responseTime > 3000 ? 'red' : 'orange'}`}>
          {stats.responseTime || 'N/A'} ms
        </span>
      </div>
    </div>
  </div>
);

export default Stats;
