import React, { useState, useEffect } from 'react';
import alertManager from '../utils/alertManager';
import '../styles/AlertHistory.css';

function AlertHistory() {
  const [alerts, setAlerts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = alertManager.subscribe((newAlerts) => {
      setAlerts(newAlerts);
    });

    return unsubscribe;
  }, []);

  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const warningCount = alerts.filter(a => a.type === 'warning').length;

  return (
    <div className="alert-history">
      <button
        className="alert-history-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="View alert history"
      >
        <span className="alert-history-icon">🔔</span>
        {criticalCount > 0 && (
          <span className="alert-badge critical">{criticalCount}</span>
        )}
        {warningCount > 0 && (
          <span className="alert-badge warning">{warningCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="alert-history-panel">
          <div className="alert-history-header">
            <h3>Alert History</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="alert-history-content">
            {alerts.length === 0 ? (
              <div className="no-alerts">No alerts yet</div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className={`history-item history-${alert.type}`}>
                  <div className="history-icon">{alert.icon}</div>
                  <div className="history-details">
                    <div className="history-message">{alert.message}</div>
                    <div className="history-time">
                      {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="alert-history-footer">
            <button
              className="clear-btn"
              onClick={() => alertManager.clearAlerts()}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertHistory;
