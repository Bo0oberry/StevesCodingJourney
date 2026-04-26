document.addEventListener('DOMContentLoaded', () => {
    const navElement = document.querySelector('nav');
    const targetElement = navElement.querySelector('ul');

    // targetElement.querySelectorAll('li a').forEach((ele)=>{ele.innerHTML= "test"}) 

    targetElement.addEventListener('wheel', (eventData) => {
        // Prevent the page from scrolling vertically
        eventData.preventDefault();
        targetElement.scrollLeft += eventData.deltaY;
    },  { passive: false});

    if (navElement) {
    
        console.log("Nav found and colored!");
    } else {
        console.error("Nav NOT found!");
    }
});