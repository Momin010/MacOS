// Main script for MacOS simulation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the system
    initSystem();
});

function initSystem() {
    // Set up event listeners for dock items
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            openApp(app);
        });
    });

    // Set up event listeners for desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            openApp(app);
        });
    });

    // Menu bar interactions (basic)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // For now, just log
            console.log('Menu item clicked:', this.textContent);
        });
    });

    // Update time in menu bar
    updateTime();
    setInterval(updateTime, 1000);
}

function updateTime() {
    const timeElement = document.querySelector('.right-menu .menu-item:last-child');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function openApp(appName) {
    // This will be handled by windows.js and specific app scripts
    if (typeof window[appName + 'App'] !== 'undefined') {
        window[appName + 'App'].open();
    } else {
        console.error('App not found:', appName);
    }
}

// Utility functions
function createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

function appendChildren(parent, ...children) {
    children.forEach(child => parent.appendChild(child));
}

// More utility functions can be added here