const appsWidgets = document.getElementById('apps-widgets');

/**
 * @param {HTMLElement} el 
 * @param {String} name 
 */
function clickApp(el, name) {
    const lastState = el.classList.contains('clickedOnce');
    document.querySelectorAll('.app').forEach(e => e.classList.remove('clickedOnce'))

    if (!lastState) {
        el.classList.add('clickedOnce');
    } else {
        openAPP(name, '');
    }
}

function openAPP(appName, appContent) {
    appsWidgets.insertAdjacentHTML('beforeend', `
        <div class="app-widget">
            <div class="app-navbar">
                <span class="app-name">${appName}</span>
                <span class="close-app"><i class="fas fa-xmark"></i></span>
            </div>
            <div class="app-content">
                ${appContent}
            </div>
        </div>
    `);
}
