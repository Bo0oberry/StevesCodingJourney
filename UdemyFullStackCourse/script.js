//calc iframe size;
const boxArray = document.querySelectorAll('.iframeBox');

function syncSizes() {
    const currentPxWidth = boxArray[0].offsetWidth;
    const newBoxSize = (currentPxWidth * (9/16)) + "px";
    const linkSize = (currentPxWidth * 0.2) + "px";
    
    boxArray.forEach((element, index)=>{
        element.style.height = newBoxSize;
         
        const link = element.querySelector('a');
        if (link) {
            link.style.width = linkSize;
            link.style.height = linkSize;
        }
    });
    
}

// Run once on page load
syncSizes();
// Run every time the window is resized
window.addEventListener('resize', syncSizes);



//o0o0o0o0o0o0o     Add link to iframe box     o0o0o0o0o0o0o
const iframeArray = document.querySelectorAll('.iframeBox');

iframeArray.forEach((element, index) => {
    const iframe = element.querySelector('iframe');
    
    let newEle = createIframeLink(iframe.src);
    element.appendChild(newEle);
});

function createIframeLink(path) {
    const newAnchor = document.createElement('a');
    newAnchor.href = path;
    newAnchor.target = "_blank"; // Recommended: opens in a new tab
    
    newAnchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M440-440q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-120v-80l240-40v-445q0-15-9-27t-23-14l-208-34v-80l220 36q44 8 72 41t28 77v512l-320 54Zm-160 0v-80h80v-560q0-34 23.5-57t56.5-23h400q34 0 57 23t23 57v560h80v80H120Zm160-80h400v-560H280v560Z"/></svg>';
    
    return newAnchor;
}
