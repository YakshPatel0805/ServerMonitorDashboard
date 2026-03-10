import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import MetricCard from "../components/MetricCard";
import MetricsChart from "../components/MetricsChart";
import UptimeCard from "../components/UptimeCard";
import AlertContainer from "../components/AlertContainer";
import AlertHistory from "../components/AlertHistory";
import serverMonitor from "../utils/serverMonitor";
import alertManager from "../utils/alertManager";
import "../styles/Dashboard.css";

function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Start server monitoring
    serverMonitor.startMonitoring();

    const handleMetricUpdate = (data) => {
      console.log("New metric:", data);
      setMetrics((prev) => [...prev.slice(-59), data]);
      
      // Check metrics for alerts
      serverMonitor.checkMetrics(data);
    };

    socket.on("connect", () => {
      setConnected(true);
      console.log("Connected to server");
      alertManager.info("Connected to server");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from server");
      alertManager.warning("Disconnected from server");
    });

    socket.on("metric_update", handleMetricUpdate);

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      alertManager.error(`Socket error: ${error.message}`);
    });

    return () => {
      socket.off("metric_update", handleMetricUpdate);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("error");
      serverMonitor.stopMonitoring();
    };
  }, []);

  const latest = metrics[metrics.length - 1] || {};

  return (
    <div className="dashboard-container">
      <AlertContainer />
      <AlertHistory />
      
      <div className="dashboard-header">
        <h1>Server Monitor</h1>
        <div className="connection-status">
          <div
            className={`status-indicator ${
              connected ? "connected" : "disconnected"
            }`}
          ></div>
          <span>{connected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="CPU Usage"
          value={latest.cpuUsage || 0}
          barClass="cpu-bar"
        />
        <MetricCard
          label="RAM Usage"
          value={latest.ramUsage || 0}
          barClass="ram-bar"
        />
        <MetricCard
          label="Disk Usage"
          value={latest.diskUsage || 0}
          barClass="disk-bar"
        />
        <UptimeCard uptime={latest.uptime || 0} />
      </div>

      <div className="charts-grid">
        <MetricsChart
          data={metrics}
          title="CPU Usage Over Time"
          dataKey="cpuUsage"
          stroke="#3b82f6"
        />
        <MetricsChart
          data={metrics}
          title="RAM Usage Over Time"
          dataKey="ramUsage"
          stroke="#8b5cf6"
        />
        <MetricsChart
          data={metrics}
          title="Disk Usage Over Time"
          dataKey="diskUsage"
          stroke="#ec4899"
        />
      </div>
    </div>
  );
}

export default Dashboard;
