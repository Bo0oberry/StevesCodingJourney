function wheel(action) {
    const circleBox = document.getElementById("circleCenter");
    let newSlice = document.createElement('div');
    newSlice.className = "piece";
    newSlice.innerHTML = "<div></div><div></div>";
    switch (action) {
        case "add":
            circleBox.appendChild(newSlice);
            break;
        case "remove":
            let Node =  document.querySelectorAll('.piece');
            Node[Node.length -1].remove();
            break;
        
    }
    orderWheel();
}


function getBrightColor(x,length) {
    const hue = 0 + (length * x); // 0 = Red, 120 = Green, 240 = Blue
    return `hsl(${hue}, 100%, 50%)`; 
}

function orderWheel(){
    let container_total = document.querySelector("#circleCenter").children;
    document.getElementById("circle").style.setProperty('--total', container_total.length);

    const firstPiece = document.querySelector(".piece");

    if(container_total.length === 1) {
        firstPiece?.classList.add("single");
        return;
    }

    document.querySelector(".single")?.classList.remove("single");   

    const sliceArray = document.querySelectorAll(".piece");
    let sliceAngle = 360 / container_total.length;

    sliceArray.forEach((slice, i) => {
        slice.style.transform = `rotate(${sliceAngle * i}deg)`;
        //slice.style.border = `3px solid ${getBrightColor()}`;
        slice.style.backgroundColor = getBrightColor(i, sliceAngle);
    });
    
};

orderWheel();



/*  Code Block */
const arrayOfCodeBlocks = document.querySelectorAll('section code');

// Pass the function name directly to forEach
arrayOfCodeBlocks.forEach(scanCode);

function scanCode(codeBlock) {
    // 1. Get the content of the specific block being scanned
    let content = codeBlock.innerHTML;

    // 2. Perform the replacement
    // This wraps the brackets and the tag content separately
    content = content.replace(/(&lt;\/?)([\s\S]*?)(&gt;)/g, 
        '<span class="bracket">$1</span><span class="tag">$2</span><span class="bracket">$3</span>'
    );

    // 3. Update the specific block
    codeBlock.innerHTML = content;
}