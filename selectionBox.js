const desktop = document.getElementById('desktop');
const appsGrid = document.getElementById('apps');
const selectionBox = document.getElementById('selection-box');
let startX, startY, isDragging = false;

const getMousePos = (e) => ({
    x: e.pageX - desktop.offsetLeft,
    y: e.pageY - desktop.offsetTop
});

desktop.addEventListener('mousedown', (e) => {
    if (e.target === appsGrid) {
        document.querySelectorAll('.app').forEach(el => el.classList.remove('clickedOnce'));
    }
    const pos = getMousePos(e);

    startX = pos.x;
    startY = pos.y;

    Object.assign(selectionBox.style, {
        left: `${startX}px`,
        top: `${startY}px`,
        width: '0px',
        height: '0px',
        display: 'block'
    });

    isDragging = true;
});

desktop.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const { x: mouseX, y: mouseY } = getMousePos(e);

    Object.assign(selectionBox.style, {
        width: `${Math.abs(mouseX - startX)}px`,
        height: `${Math.abs(mouseY - startY)}px`,
        left: `${Math.min(mouseX, startX)}px`,
        top: `${Math.min(mouseY, startY)}px`
    });

});

desktop.addEventListener('mouseup', (e) => {
    isDragging = false;
    selectionBox.style.display = 'none';
});