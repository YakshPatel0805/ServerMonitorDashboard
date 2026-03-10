const express = require("express");
const router = express.Router();

const { receiveMetrics } = require("../controllers/metricsController");

router.post("/", receiveMetrics);

module.exports = router;