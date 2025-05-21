let activeNotificationTimeout;

export function showNotification(message, duration = 3000) {
  const notification = document.getElementById('notification');
  
  if (!notification) return;
  
  // Clear any existing timeouts
  if (activeNotificationTimeout) {
    clearTimeout(activeNotificationTimeout);
  }
  
  // Hide current notification if visible
  notification.classList.remove('show');
  notification.classList.remove('hide');
  
  // Set message
  notification.textContent = message;
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
    
    // Hide notification after duration
    activeNotificationTimeout = setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
    }, duration);
  }, 10);
}