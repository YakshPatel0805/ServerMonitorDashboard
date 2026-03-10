const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema({
  name: String,
  ipAddress: String,
  status: {
    type: String,
    default: "ONLINE",
  },
  lastHeartbeat: Date,
});

module.exports = mongoose.model("Server", ServerSchema);