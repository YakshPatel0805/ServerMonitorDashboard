const Metric = require("../models/Metric");

exports.receiveMetrics = async (req, res) => {
  try {

    const metric = await Metric.create(req.body);

    if (global.io) {
      global.io.emit("metric_update", metric);
    }

    res.status(201).json({
      message: "Metrics received",
      metric
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};