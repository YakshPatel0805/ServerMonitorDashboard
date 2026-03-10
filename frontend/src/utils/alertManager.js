// Alert Manager for handling notifications
class AlertManager {
  constructor() {
    this.alerts = [];
    this.listeners = [];
    this.alertTimeout = 5000; // 5 seconds
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(listeners) {
    listeners.forEach(listener => listener(this.alerts));
  }

  addAlert(alert) {
    const id = Date.now();
    const newAlert = {
      id,
      timestamp: new Date(),
      ...alert,
    };

    this.alerts = [newAlert, ...this.alerts].slice(0, 50); // Keep last 50 alerts
    this.notify(this.listeners);

    // Auto-remove alert after timeout
    if (alert.type !== 'error') {
      setTimeout(() => {
        this.removeAlert(id);
      }, this.alertTimeout);
    }

    return id;
  }

  removeAlert(id) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
    this.notify(this.listeners);
  }

  clearAlerts() {
    this.alerts = [];
    this.notify(this.listeners);
  }

  // Alert types
  success(message) {
    return this.addAlert({
      type: 'success',
      message,
      icon: '✓',
    });
  }

  warning(message) {
    return this.addAlert({
      type: 'warning',
      message,
      icon: '⚠',
    });
  }

  error(message) {
    return this.addAlert({
      type: 'error',
      message,
      icon: '✕',
    });
  }

  info(message) {
    return this.addAlert({
      type: 'info',
      message,
      icon: 'ℹ',
    });
  }

  critical(message) {
    return this.addAlert({
      type: 'critical',
      message,
      icon: '🚨',
    });
  }
}

export default new AlertManager();
