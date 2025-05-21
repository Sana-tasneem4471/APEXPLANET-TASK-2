import { initFormValidation } from './formValidation.js';
import { initTodoList } from './todoList.js';
import { initThemeToggle } from './themeToggle.js';
import { showNotification } from './notification.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
  initTodoList();
  initThemeToggle();
  
  // Show welcome notification
  setTimeout(() => {
    showNotification('Welcome to the Web Development Project!');
  }, 1000);
});