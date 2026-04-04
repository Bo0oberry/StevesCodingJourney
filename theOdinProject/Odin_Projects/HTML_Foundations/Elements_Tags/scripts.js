let nav = document.getElementById("nav");
nav.style.visibility="hidden";
const list = ["default"];
let timeOutSet = false;

window.onscroll = navTimer;

document.querySelector('nav').onmouseenter = () => {
    clearTimeout(list[0]);
    timeOutSet = false;
}

document.querySelector('nav').onmouseleave = () => {
    navTimer();
}

function navTimer(){
    nav.style.visibility="visible";

    if ((window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight) {
        clearTimeout(list[0]);
        return;
    }

    if (timeOutSet) {
        clearTimeout(list[0]);
    }

    let timeOut = setTimeout(
        () => {
            nav.style.visibility="hidden"; 
        },
        2500
    );
    list[0] = timeOut; 
    timeOutSet = true;  
        
}

