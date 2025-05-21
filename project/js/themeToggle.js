export function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeToggle || !themeIcon) return;
  
  // Check user's preferred color scheme
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Check if user has a saved preference
  const savedTheme = localStorage.getItem('theme');
  
  // Set initial theme based on saved preference, or system preference
  if (savedTheme === 'dark' || (savedTheme !== 'light' && prefersDarkMode)) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = 'dark_mode';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = 'light_mode';
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    if (isDarkMode) {
      themeIcon.textContent = 'dark_mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = 'light_mode';
      localStorage.setItem('theme', 'light');
    }
  });
}