const appsWidgets = document.getElementById('apps-widgets');

const APP_ICONS = [
    "3d-printer.png",
    "air-conditioner.png",
    "body-scanner.png",
    "cctv-camera.png",
    "computer-tower.png",
    "conveyor.png",
    "creative-thinking.png",
    "data-center.png",
    "desktop-pc.png",
    "digital-wallet.png",
    "e-bike.png",
    "earpods.png",
    "electric-kettle.png",
    "fax-machine.png",
    "game-console.png",
    "graphic-card.png",
    "hammer-drill.png",
    "jetpack.png",
    "laptop.png",
    "memory-card.png",
    "microphone.png",
    "microwave-oven.png",
    "pen-tablet.png",
    "power-bank.png",
    "processor.png",
    "projector.png",
    "ram.png",
    "robot-hand.png",
    "robot-vacuum-cleaner.png",
    "robot.png",
    "sata.png",
    "sim-card.png",
    "smart-drone.png",
    "smart-energy.png",
    "smart-glasses.png",
    "smart-home.png",
    "smart-refrigerator.png",
    "smartwatch.png",
    "solar-panel.png",
    "space-satellite.png",
    "speaker-box.png",
    "traffic-light.png",
    "usb-drive.png",
    "washing-machine.png",
    "wifi-router.png"
];

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
    "Apps Creator": () => `
        <h3>Create Your APP!</h3>
        <div id="appscreator-creator">
            <p class="appscreator-subtitles">Select an icon:</p>
            <div class="appscreator-selecticon">
                ${APP_ICONS.map(icon => `
                <div onclick="appscreator_selecticon(this)" style="--iconURL: url('/icons/${icon}');"></div>
                `).join('')}
            </div>
            <p class="appscreator-subtitles">Enter Your App Name:</p>
            <input type="text" id="appscreator-input-appname" />

            <p class="appscreator-subtitles">Enter Your App URL:</p>
            <input type="url" id="appscreator-input-appurl" />

            <button>Create</button>
        </div>
        <script>${`
            function appscreator_selecticon(div) {
                
            }
        `}</script>
        <style>${`
            #appscreator-creator {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 15px;
            }
            #appscreator-creator input {
                padding: 10px;
                border-radius: 10px;
            }
            #appscreator-creator button {
                padding: 10px;
                border-radius: 10px;
                font-weight: bold;
                font-size: large;
                cursor: pointer;
            }
            .appscreator-subtitles {
                font-weight: bold;
                font-size: large;
                margin-top: 5px;
            }
            .appscreator-selecticon {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 10px;
                overflow-y: scroll;
                height: 115px;
            }
            .appscreator-selecticon div {
                --size: 50px;
                width: var(--size);
                height: var(--size);
                background-image: var(--iconURL);
                background-position: center;
                background-size: contain;
            }
        `}</style>
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
