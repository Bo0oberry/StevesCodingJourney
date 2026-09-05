function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 50%)`;
}

function createBox(numOfBoxes){
  const mainBox = document.querySelector(".boxPrime");
  for (let i= 0; i < numOfBoxes; i++) {
    const newBox = document.createElement("div");
    newBox.classList.add("box");
    mainBox.appendChild(newBox);
  }
  return;
}

function styleBox(){
  boxList = document.querySelectorAll(".box");
  const boxWidthStr = window.getComputedStyle(document.querySelector(".box")).width;
  const boxWidth = parseFloat(boxWidthStr);
  const angle = 360 / boxList.length;
  const radius = Math.round((boxWidth / 2) / Math.tan((angle / 2) * Math.PI / 180));
  
  boxList.forEach((ele, index) => {
    ele.style.backgroundColor = randomColor();
    
    const currentRotation = angle * index;
    
    ele.style.transform =
      `rotateY(${currentRotation}deg)
       translateZ(${radius + gap}px)`;
  });
}

const boxAmount = 10; 
const gap = 100;

createBox(boxAmount);
styleBox();
