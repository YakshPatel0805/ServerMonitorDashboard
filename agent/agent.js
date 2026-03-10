const si = require("systeminformation");
const axios = require("axios");

const SERVER_ID = "server-1";
const API_URL = "http://localhost:5000/api/metrics";

async function collectMetrics() {
  try {

    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const time = await si.time();

    const metrics = {
      serverId: SERVER_ID,
      cpuUsage: cpu.currentLoad.toFixed(2),
      ramUsage: ((mem.used / mem.total) * 100).toFixed(2),
      diskUsage: ((disk[0].use / disk[0].size) * 100).toFixed(2),
      uptime: time.uptime
    };

    await axios.post(API_URL, metrics);

    console.log("Metrics sent:", metrics);

  } catch (error) {
    console.error("Error sending metrics:", error.message);
  }
}

setInterval(collectMetrics, 5000);