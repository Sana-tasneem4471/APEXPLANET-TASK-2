import { showNotification } from './notification.js';

export function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  // Input elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  // Error elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous errors
    resetErrors();
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Name is required');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters');
      isValid = false;
    }
    
    // Email validation
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Subject validation
    if (!subjectInput.value) {
      showError(subjectInput, subjectError, 'Please select a subject');
      isValid = false;
    }
    
    // Message validation
    if (!messageInput.value.trim()) {
      showError(messageInput, messageError, 'Message is required');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters');
      isValid = false;
    }
    
    // If form is valid, submit it
    if (isValid) {
      // Add animation class
      contactForm.classList.add('form-submitting');
      
      // Simulate form submission
      setTimeout(() => {
        contactForm.reset();
        contactForm.classList.remove('form-submitting');
        showNotification('Message sent successfully!');
      }, 800);
    }
  });
  
  // Input event listeners for real-time validation
  nameInput.addEventListener('input', () => {
    clearError(nameInput, nameError);
  });
  
  emailInput.addEventListener('input', () => {
    clearError(emailInput, emailError);
  });
  
  subjectInput.addEventListener('change', () => {
    clearError(subjectInput, subjectError);
  });
  
  messageInput.addEventListener('input', () => {
    clearError(messageInput, messageError);
  });
}

function showError(inputElement, errorElement, message) {
  inputElement.parentElement.classList.add('has-error');
  errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
  inputElement.parentElement.classList.remove('has-error');
  errorElement.textContent = '';
}

function resetErrors() {
  // Get all error messages
  const errorMessages = document.querySelectorAll('.error-message');
  const formGroups = document.querySelectorAll('.form-group');
  
  // Clear all error messages
  errorMessages.forEach(error => {
    error.textContent = '';
  });
  
  // Remove has-error class from all form groups
  formGroups.forEach(group => {
    group.classList.remove('has-error');
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}