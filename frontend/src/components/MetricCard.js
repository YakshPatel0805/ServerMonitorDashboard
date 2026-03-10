import React from "react";

function MetricCard({ label, value, barClass }) {
  const percentage = Math.min(Math.max(parseFloat(value) || 0, 0), 100);

  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}%</div>
      <div className={`metric-bar ${barClass}`}>
        <div
          className="metric-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default MetricCard;
