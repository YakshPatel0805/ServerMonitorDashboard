import React from "react";

function UptimeCard({ uptime }) {
  const formatUptime = (seconds) => {
    if (!seconds) return "0s";

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
  };

  return (
    <div className="uptime-card">
      <div className="uptime-label">Server Uptime</div>
      <div className="uptime-value">{formatUptime(uptime)}</div>
    </div>
  );
}

export default UptimeCard;
