import React, { useState, useEffect, createContext, useContext } from 'react';

// 🎯 BESTIA Notifications Context
const BestiaNotificationsContext = createContext();

export const useBestiaNotifications = () => {
  const context = useContext(BestiaNotificationsContext);
  if (!context) {
    throw new Error('useBestiaNotifications must be used within BestiaNotificationsProvider');
  }
  return context;
};

// 🔥 Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  BOOKING: 'booking',
  PAYMENT: 'payment',
  LIMOUSINE: 'limousine'
};

// 🚀 BESTIA Notification Item Component
const BestiaNotificationItem = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance animation
    setTimeout(() => setIsVisible(true), 50);

    // Auto-dismiss after duration
    if (notification.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return '✅';
      case NOTIFICATION_TYPES.ERROR:
        return '❌';
      case NOTIFICATION_TYPES.WARNING:
        return '⚠️';
      case NOTIFICATION_TYPES.INFO:
        return 'ℹ️';
      case NOTIFICATION_TYPES.BOOKING:
        return '📅';
      case NOTIFICATION_TYPES.PAYMENT:
        return '💳';
      case NOTIFICATION_TYPES.LIMOUSINE:
        return '🚗';
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = () => {
    return `bestia-notification--${notification.type}`;
  };

  return (
    <div
      className={`
        bestia-notification
        ${getTypeClass()}
        ${isVisible ? 'bestia-notification--visible' : ''}
        ${isExiting ? 'bestia-notification--exiting' : ''}
      `}
      onClick={notification.clickable ? notification.onClick : undefined}
      style={{ cursor: notification.clickable ? 'pointer' : 'default' }}
    >
      <div className="bestia-notification__icon">
        {getIcon()}
      </div>

      <div className="bestia-notification__content">
        {notification.title && (
          <div className="bestia-notification__title">
            {notification.title}
          </div>
        )}
        <div className="bestia-notification__message">
          {notification.message}
        </div>
        {notification.action && (
          <button
            className="bestia-notification__action"
            onClick={(e) => {
              e.stopPropagation();
              notification.action.onClick();
            }}
          >
            {notification.action.label}
          </button>
        )}
      </div>

      <button
        className="bestia-notification__close"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Close notification"
      >
        ×
      </button>

      {notification.progress !== undefined && (
        <div className="bestia-notification__progress">
          <div
            className="bestia-notification__progress-bar"
            style={{ width: `${notification.progress}%` }}
          />
        </div>
      )}

      <style jsx>{`
        .bestia-notification {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          margin-bottom: 12px;
          background: var(--bestia-bg-secondary);
          border: 1px solid var(--bestia-border);
          border-radius: var(--bestia-border-radius);
          box-shadow: var(--bestia-shadow-lg);
          backdrop-filter: blur(20px);
          transform: translateX(400px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          overflow: hidden;
          max-width: 400px;
          min-width: 320px;
        }

        .bestia-notification::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--bestia-gradient);
        }

        .bestia-notification--visible {
          transform: translateX(0);
          opacity: 1;
        }

        .bestia-notification--exiting {
          transform: translateX(400px) scale(0.8);
          opacity: 0;
        }

        .bestia-notification--success::before {
          background: linear-gradient(90deg, #4ecdc4, #44a08d);
        }

        .bestia-notification--error::before {
          background: linear-gradient(90deg, #ff6b6b, #ee5a52);
        }

        .bestia-notification--warning::before {
          background: linear-gradient(90deg, #ffe66d, #ffcc02);
        }

        .bestia-notification--info::before {
          background: linear-gradient(90deg, #4ecdc4, #44a08d);
        }

        .bestia-notification--booking::before {
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .bestia-notification--payment::before {
          background: var(--bestia-gradient);
        }

        .bestia-notification--limousine::before {
          background: linear-gradient(90deg, #ffd700, #ffed4e);
        }

        .bestia-notification__icon {
          font-size: 24px;
          line-height: 1;
          flex-shrink: 0;
          animation: bestiaIconBounce 0.6s ease-out;
        }

        .bestia-notification__content {
          flex: 1;
          min-width: 0;
        }

        .bestia-notification__title {
          font-weight: 600;
          font-size: 16px;
          color: var(--bestia-text-primary);
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .bestia-notification__message {
          font-size: 14px;
          color: var(--bestia-text-secondary);
          line-height: 1.4;
          word-wrap: break-word;
        }

        .bestia-notification__action {
          background: var(--bestia-gradient);
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          color: var(--bestia-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: var(--bestia-transition);
        }

        .bestia-notification__action:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .bestia-notification__close {
          background: none;
          border: none;
          color: var(--bestia-text-tertiary);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: var(--bestia-transition);
          flex-shrink: 0;
        }

        .bestia-notification__close:hover {
          background: var(--bestia-bg-tertiary);
          color: var(--bestia-text-primary);
          transform: scale(1.1);
        }

        .bestia-notification__progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .bestia-notification__progress-bar {
          height: 100%;
          background: var(--bestia-gradient);
          transition: width 0.3s ease;
          animation: bestiaProgressPulse 2s ease-in-out infinite;
        }

        @keyframes bestiaIconBounce {
          0%, 20%, 60%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          80% {
            transform: translateY(-5px);
          }
        }

        @keyframes bestiaProgressPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @media (max-width: 768px) {
          .bestia-notification {
            max-width: calc(100vw - 32px);
            min-width: unset;
            margin: 0 16px 12px;
          }
        }
      `}</style>
    </div>
  );
};

// 🎯 BESTIA Notifications Container
const BestiaNotificationsContainer = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="bestia-notifications-container">
      {notifications.map((notification) => (
        <BestiaNotificationItem
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}

      <style jsx>{`
        .bestia-notifications-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          overflow-x: visible;
          pointer-events: none;
        }

        .bestia-notifications-container > :global(.bestia-notification) {
          pointer-events: all;
        }

        @media (max-width: 768px) {
          .bestia-notifications-container {
            top: 10px;
            right: 10px;
            left: 10px;
          }
        }
      `}</style>
    </div>
  );
};

// 🚀 BESTIA Notifications Provider
export const BestiaNotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: NOTIFICATION_TYPES.INFO,
      duration: 5000,
      clickable: false,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Return notification ID for manual control
    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateNotification = (id, updates) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  // Predefined notification methods
  const success = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      message,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      message,
      duration: 8000, // Longer for errors
      ...options,
    });
  };

  const warning = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      message,
      ...options,
    });
  };

  const info = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.INFO,
      message,
      ...options,
    });
  };

  const booking = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.BOOKING,
      message,
      ...options,
    });
  };

  const payment = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.PAYMENT,
      message,
      ...options,
    });
  };

  const limousine = (message, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.LIMOUSINE,
      message,
      ...options,
    });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    updateNotification,
    success,
    error,
    warning,
    info,
    booking,
    payment,
    limousine,
  };

  return (
    <BestiaNotificationsContext.Provider value={value}>
      {children}
      <BestiaNotificationsContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </BestiaNotificationsContext.Provider>
  );
};

// 🎯 Hook for easy notification usage
export const useBestiaNotify = () => {
  const { success, error, warning, info, booking, payment, limousine } = useBestiaNotifications();

  return {
    success,
    error,
    warning,
    info,
    booking,
    payment,
    limousine,
  };
};

export default BestiaNotificationsProvider;
