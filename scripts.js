const appsWidgets = document.getElementById('apps-widgets');

setInterval(() => {
    document.getElementById("time").textContent = `${(new Date()).toLocaleDateString()}, ${(new Date()).toLocaleTimeString()}`;
}, 1000);

const { userAgent, platform, language, appVersion } = navigator;
const os = platform.includes('Win') ? 'Windows' : platform.includes('Mac') ? 'macOS' :
    platform.includes('Linux') ? 'Linux' : platform.includes('Android') ? 'Android' :
        platform.includes('iPhone') || platform.includes('iPad') ? 'iOS' : 'Unknown';

        // <li>User Agent: ${userAgent}</li>
        // <li>App Version: ${appVersion}</li>
const READY_APPS = {
    "This PC": () => `
        <h3>Pc Informations</h3>
        <ul>
            <li>OS: <span class="primary">MohaOS</span> (WebOS) on  <span class="primary">${os}</span></li>
            <li>Platform: <span class="primary">${platform}</span></li>
            <li>Language: <span class="primary">${language}</span></li>
        </ul>
    `,
};


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
        closeAPP(name);
        setTimeout(() => {
            openAPP(name, READY_APPS[name]());
        }, 250);
    }
}

function closeAPP(appName) {
    appsWidgets.querySelector(`[--data-appname="${appName}"]`)?.querySelector('.close-app')?.click();
}

function openAPP(appName, appContent) {
    appsWidgets.insertAdjacentHTML('beforeend', `
        <div class="app-widget" --data-appname="${appName}" style="width: ${document.body.clientWidth * 0.5}px;height: ${document.body.clientHeight * 0.5}px;">
            <div class="app-navbar">
                <span class="app-name">${appName}</span>
                <span class="close-app"><i class="fas fa-xmark"></i></span>
            </div>
            <div class="app-content">
                ${appContent}
            </div>
            <div class="resizer bottom"></div>
            <div class="resizer right"></div>
            <div class="resizer left"></div>
        </div>
    `);

    const appWidget = appsWidgets.lastElementChild;
    const appNavbar = appWidget.querySelector('.app-navbar');
    const closeButton = appNavbar.querySelector('.close-app');

    appNavbar.onmousedown = (e) => {
        let startX = e.clientX, startY = e.clientY;
        const onMouseMove = (e) => {
            appWidget.style.left = `${appWidget.offsetLeft + e.clientX - startX}px`;
            appWidget.style.top = `${appWidget.offsetTop + e.clientY - startY}px`;
            startX = e.clientX; startY = e.clientY;
        }
        document.onmousemove = onMouseMove;
        document.onmouseup = () => document.onmousemove = null;
    }

    closeButton.onclick = (e) => {
        document.onmouseup = () => document.onmousemove = null;
        appWidget.classList.add("closing");
        setTimeout(() => {
            appWidget.remove();
        }, 250);
    }

    const resizers = appWidget.querySelectorAll('.resizer');
    let startX, startY, startWidth, startHeight;

    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', (e) => {
            startX = e.clientX; startY = e.clientY;
            startWidth = parseInt(getComputedStyle(appWidget).width, 10);
            startHeight = parseInt(getComputedStyle(appWidget).height, 10);
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', () => window.removeEventListener('mousemove', resize));
        });

        function resize(e) {
            if (resizer.classList.contains('bottom')) {
                appWidget.style.height = startHeight + (e.clientY - startY) + 'px';
            } else if (resizer.classList.contains('left')) {
                appWidget.style.width = startWidth - (e.clientX - startX) + 'px';
            } else if (resizer.classList.contains('right')) {
                appWidget.style.width = startWidth + (e.clientX - startX) + 'px';
            }
        }
    });

}
