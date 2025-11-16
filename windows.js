// Window management system

class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndex = 100;
        this.container = document.getElementById('windows-container');
    }

    createWindow(title, content, width = 600, height = 400, x = 100, y = 100) {
        const windowId = 'window-' + Date.now();
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = windowId;
        windowEl.style.width = width + 'px';
        windowEl.style.height = height + 'px';
        windowEl.style.left = x + 'px';
        windowEl.style.top = y + 'px';
        windowEl.style.zIndex = ++this.zIndex;

        // Header
        const header = document.createElement('div');
        header.className = 'window-header';

        const controls = document.createElement('div');
        controls.className = 'window-controls';

        const closeBtn = document.createElement('div');
        closeBtn.className = 'control red';
        closeBtn.addEventListener('click', () => this.closeWindow(windowId));

        const minimizeBtn = document.createElement('div');
        minimizeBtn.className = 'control yellow';
        minimizeBtn.addEventListener('click', () => this.minimizeWindow(windowId));

        const maximizeBtn = document.createElement('div');
        maximizeBtn.className = 'control green';
        maximizeBtn.addEventListener('click', () => this.maximizeWindow(windowId));

        controls.appendChild(closeBtn);
        controls.appendChild(minimizeBtn);
        controls.appendChild(maximizeBtn);

        const titleEl = document.createElement('div');
        titleEl.className = 'window-title';
        titleEl.textContent = title;

        header.appendChild(controls);
        header.appendChild(titleEl);

        // Content
        const contentEl = document.createElement('div');
        contentEl.className = 'window-content';
        if (typeof content === 'string') {
            contentEl.innerHTML = content;
        } else {
            contentEl.appendChild(content);
        }

        windowEl.appendChild(header);
        windowEl.appendChild(contentEl);

        this.container.appendChild(windowEl);
        this.windows.push({ id: windowId, element: windowEl, minimized: false, maximized: false });

        // Make draggable
        this.makeDraggable(windowEl, header);

        // Make resizable
        this.makeResizable(windowEl);

        // Focus on click
        windowEl.addEventListener('mousedown', () => this.focusWindow(windowId));

        return windowId;
    }

    closeWindow(windowId) {
        const windowData = this.windows.find(w => w.id === windowId);
        if (windowData) {
            this.container.removeChild(windowData.element);
            this.windows = this.windows.filter(w => w.id !== windowId);
        }
    }

    minimizeWindow(windowId) {
        const windowData = this.windows.find(w => w.id === windowId);
        if (windowData) {
            windowData.minimized = !windowData.minimized;
            windowData.element.style.display = windowData.minimized ? 'none' : 'block';
        }
    }

    maximizeWindow(windowId) {
        const windowData = this.windows.find(w => w.id === windowId);
        if (windowData) {
            windowData.maximized = !windowData.maximized;
            if (windowData.maximized) {
                windowData.originalBounds = {
                    left: windowData.element.style.left,
                    top: windowData.element.style.top,
                    width: windowData.element.style.width,
                    height: windowData.element.style.height
                };
                windowData.element.style.left = '0px';
                windowData.element.style.top = '22px';
                windowData.element.style.width = '100%';
                windowData.element.style.height = 'calc(100vh - 102px)';
            } else {
                Object.assign(windowData.element.style, windowData.originalBounds);
            }
        }
    }

    focusWindow(windowId) {
        const windowData = this.windows.find(w => w.id === windowId);
        if (windowData) {
            windowData.element.style.zIndex = ++this.zIndex;
        }
    }

    makeDraggable(element, handle) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(element.style.left);
            startTop = parseInt(element.style.top);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.style.left = (startLeft + dx) + 'px';
            element.style.top = Math.max(22, startTop + dy) + 'px'; // Keep above menu bar
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    makeResizable(element) {
        const resizer = document.createElement('div');
        resizer.style.position = 'absolute';
        resizer.style.bottom = '0';
        resizer.style.right = '0';
        resizer.style.width = '10px';
        resizer.style.height = '10px';
        resizer.style.cursor = 'nw-resize';
        element.appendChild(resizer);

        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(element.style.width);
            startHeight = parseInt(element.style.height);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isResizing) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.style.width = Math.max(300, startWidth + dx) + 'px';
            element.style.height = Math.max(200, startHeight + dy) + 'px';
        }

        function onMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
}

const windowManager = new WindowManager();

// Export for use in apps
window.WindowManager = WindowManager;
window.windowManager = windowManager;