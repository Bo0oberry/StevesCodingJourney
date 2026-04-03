let nav = document.getElementById("nav");
nav.style.visibility="hidden";
const list = ["default"];
let timeOutSet = false;

document.getElementById("body").onscroll = function(){
    nav.style.visibility="visible";

    if ((window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight) {
        return;
    }

    if (timeOutSet) {
        clearTimeout(list[0]);
    }

    let timeOut = setTimeout(
        () => {
            nav.style.visibility="hidden"; 
        },
        1000
    );
    list[0] = timeOut; 
    timeOutSet = true;  
     
    
};
