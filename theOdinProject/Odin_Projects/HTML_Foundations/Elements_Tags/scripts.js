let nav = document.getElementById("nav");
nav.style.visibility="hidden";
const list = ["default"];
let timeOutSet = false;

document.getElementById("body").onscroll = function(){
    nav.style.visibility="visible";

    if (timeOutSet) {
        clearTimeout(list[0]);
    }

    let timeOut = setTimeout(
        () => {
            nav.style.visibility="hidden"; 
        },
        2000
    );
    list[0] = timeOut; 
    timeOutSet = true;  
     
    
};
