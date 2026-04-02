// ------------------- Get Height of Header ---------//
const header = document.querySelector('header');
const root = document.querySelector('html');
const menu = document.querySelectorAll('.header-spacer')
let headerHeight = header.offsetHeight;
root.style.setProperty('--headerHeight', headerHeight + "px");


function radialMenuDisplay() {
    const radialNav = document.querySelector('#radial-menu').classList.toggle('isVisable');

    let thisButton = document.querySelector('#radial-menu button i');
    if (thisButton.classList.contains('fa-folder-plus')) {
        thisButton.classList.remove('fa-folder-plus');
        thisButton.classList.add('fa-folder-minus');
        thisButton.style.color = "white";
    }else {
        thisButton.classList.remove('fa-folder-minus');
        thisButton.classList.add('fa-folder-plus');
        thisButton.style.color = "salmon";
    }
}



window.addEventListener('load', () => {
    const ul = document.querySelector('#radial-menu ul');
    const items = ul.querySelectorAll('li a');
    let maxWidth = 0;

    // 1. Loop through all li items to find the largest width
    items.forEach(item => {
        // offsetWidth includes borders and padding
        const itemWidth = item.offsetWidth;
        if (itemWidth > maxWidth) {
            maxWidth = itemWidth;
        }
    });

    
    ul.style.width = (maxWidth + (headerHeight/2) + 20) + 'px';

});

menu.forEach(
        (element)=>{
            element.style.height = headerHeight;
        }
);



const navListWrap = document.querySelector('#list-wrapper');
let isThrottled = false;

document.querySelector('#radial-menu ul').addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isThrottled) return;

    isThrottled = true;
    // Set throttle slightly longer than the animation for a "clean" feel
    setTimeout(() => isThrottled = false, 250); 

    const direction = e.deltaY > 0 ? 'down' : 'up';
    shiftAlongCurve(direction);
});

function shiftAlongCurve(direction) {
    const items = Array.from(navListWrap.children);

    // 1. FIRST: Get the current positions (Top and Left because it's curved!)
    const firstPositions = items.map(el => {
        const rect = el.getBoundingClientRect();
        return { top: rect.top, left: rect.left };
    });

    // 2. LAST: Perform the actual DOM move
    if (direction === 'down') {
        navListWrap.appendChild(navListWrap.firstElementChild);
    } else {
        navListWrap.insertBefore(navListWrap.lastElementChild, navListWrap.firstElementChild);
    }

    // 3. INVERT & PLAY: Calculate the "delta" and animate
    requestAnimationFrame(() => {
        const newItems = Array.from(navListWrap.children);

        newItems.forEach((el) => {
            const oldIndex = items.indexOf(el);
            const oldPos = firstPositions[oldIndex];
            const newPos = el.getBoundingClientRect();

            const deltaY = oldPos.top - newPos.top;
            const deltaX = oldPos.left - newPos.left;

            // Instantly move it back to where it WAS
            el.style.transition = 'none';
            el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            // Force a "reflow" so the browser registers the 'none' transition
            el.offsetHeight; 

            // Transition it to its new natural position (0, 0)
            // This will naturally follow the curve because deltaX/deltaY accounted for it
            el.style.transition = 'transform 0.4s cubic-bezier(0.2, 1, 0.3, 1)';
            el.style.transform = 'translate(0, 0)';
        });
    });
}
