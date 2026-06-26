// theme.js - Handle dynamic light/dark mode theme and toggle integration
(function () {
  // 1. Immediately determine and set the theme to avoid FOUC
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {
    console.warn("Storage access not available:", e);
  }
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  // 2. Setup theme toggle button once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Create container and button
    const li = document.createElement('li');
    li.className = 'nav-item theme-toggle-item';
    
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'theme-toggle-btn';
    button.setAttribute('aria-label', 'Toggle theme (light/dark)');
    button.setAttribute('type', 'button');

    // Set initial icon
    const activeTheme = document.documentElement.getAttribute('data-theme');
    updateToggleIcon(button, activeTheme);

    // Click handler
    button.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update HTML attribute
      document.documentElement.setAttribute('data-theme', newTheme);
      // Persist setting
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        console.warn("Could not save theme to storage:", e);
      }
      // Update button icon
      updateToggleIcon(button, newTheme);
    });

    li.appendChild(button);
    navMenu.appendChild(li);
  });

  // Helper to inject beautiful SVG icons depending on active theme
  function updateToggleIcon(button, theme) {
    if (theme === 'dark') {
      // Sun icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      // Moon icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }
})();
