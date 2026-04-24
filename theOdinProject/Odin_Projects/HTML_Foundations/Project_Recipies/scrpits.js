const imgWidth = document.querySelector('#linkBox img').getBoundingClientRect().width;
document.querySelector(':root').style.setProperty('--imgSizeWidth', `${imgWidth}px`);

const box = document.querySelector('#linkBox');
const links = box.querySelectorAll('a');
const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-length'));

links.forEach((link, index) => {
    link.style.animationDelay = `-${(duration / links.length) * index}s`;
});



