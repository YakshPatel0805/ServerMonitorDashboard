import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MetricsChart({ data, title, dataKey, stroke, yAxisDomain }) {
  if (!data || data.length === 0) {
    return <div className="no-data text-white">Waiting for data...</div>;
  }

  const chartData = data.map((item, index) => ({
    ...item,
    time: new Date(item.createdAt).toLocaleTimeString(),
  }));

  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#999"
              style={{ fontSize: "0.85rem" }}
            />
            <YAxis
              stroke="#999"
              domain={yAxisDomain || [0, 100]}
              style={{ fontSize: "0.85rem" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MetricsChart;
