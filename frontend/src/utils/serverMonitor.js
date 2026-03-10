import alertManager from './alertManager';

// Server Monitor for detecting crashes and anomalies
class ServerMonitor {
  constructor() {
    this.lastMetricTime = null;
    this.offlineTimeout = 15000; // 15 seconds
    this.offlineTimer = null;
    this.isOffline = false;
    this.alertedThresholds = {
      cpu: false,
      ram: false,
    };
  }

  checkMetrics(metric) {
    // Reset offline timer
    this.resetOfflineTimer();

    // Check if server was offline and is now back online
    if (this.isOffline) {
      this.isOffline = false;
      alertManager.success('🟢 Server is back online');
      this.alertedThresholds = { cpu: false, ram: false };
    }

    // Check CPU usage
    const cpuUsage = parseFloat(metric.cpuUsage);
    if (cpuUsage > 90) {
      if (!this.alertedThresholds.cpu) {
        alertManager.critical(`🔴 CPU Usage Critical: ${cpuUsage}%`);
        this.alertedThresholds.cpu = true;
      }
    } else if (cpuUsage <= 85) {
      this.alertedThresholds.cpu = false;
    }

    // Check RAM usage
    const ramUsage = parseFloat(metric.ramUsage);
    if (ramUsage > 90) {
      if (!this.alertedThresholds.ram) {
        alertManager.critical(`🔴 RAM Usage Critical: ${ramUsage}%`);
        this.alertedThresholds.ram = true;
      }
    } else if (ramUsage <= 85) {
      this.alertedThresholds.ram = false;
    }

    this.lastMetricTime = Date.now();
  }

  resetOfflineTimer() {
    if (this.offlineTimer) {
      clearTimeout(this.offlineTimer);
    }

    this.offlineTimer = setTimeout(() => {
      if (!this.isOffline) {
        this.isOffline = true;
        alertManager.critical('🚨 Server Offline - No metrics received');
      }
    }, this.offlineTimeout);
  }

  startMonitoring() {
    this.resetOfflineTimer();
  }

  stopMonitoring() {
    if (this.offlineTimer) {
      clearTimeout(this.offlineTimer);
    }
  }

  reset() {
    this.stopMonitoring();
    this.lastMetricTime = null;
    this.isOffline = false;
    this.alertedThresholds = { cpu: false, ram: false };
  }
}

export default new ServerMonitor();
