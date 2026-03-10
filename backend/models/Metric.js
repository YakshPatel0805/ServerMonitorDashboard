const mongoose = require("mongoose");

const MetricSchema = new mongoose.Schema({
  serverId: String,
  cpuUsage: Number,
  ramUsage: Number,
  diskUsage: Number,
  uptime: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Metric", MetricSchema);