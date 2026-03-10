import React, { useState, useEffect } from 'react';
import '../styles/Alerts.css';

function AlertContainer() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Import here to avoid circular dependencies
    const alertManager = require('../utils/alertManager').default;

    const unsubscribe = alertManager.subscribe((newAlerts) => {
      setAlerts(newAlerts);
    });

    return unsubscribe;
  }, []);

  const removeAlert = (id) => {
    const alertManager = require('../utils/alertManager').default;
    alertManager.removeAlert(id);
  };

  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            <span className="alert-icon">{alert.icon}</span>
            <span className="alert-message">{alert.message}</span>
          </div>
          {alert.type !== 'critical' && (
            <button
              className="alert-close"
              onClick={() => removeAlert(alert.id)}
              aria-label="Close alert"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AlertContainer;
