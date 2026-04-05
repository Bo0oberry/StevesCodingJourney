// Script for Links and Images lesson

//Push down sticky aside by  header height
const header = document.querySelector('header');
const aside = document.querySelector('aside');
aside.style.top = `${window.innerHeight - header.offsetHeight - (aside.offsetHeight/2)}px`;


// Get color of main background then apply a slighly darker shade to kbd
const mainElement = document.querySelector('main');
const mainBGColor = getComputedStyle(mainElement).backgroundColor;
const darkerShade = mainBGColor.replace(/rgb\((\d+), (\d+), (\d+)\)/, (match, r, g, b) => {
    return `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`;
});

document.querySelector('html').style.setProperty('--mainBgColorDarker', darkerShade);