function loadBox() {
  const boxArray = document.querySelectorAll(".header_boxMain");
  const headerHeight = document.querySelector("header").offsetHeight;
  const boxHeight = (headerHeight * 0.8) ;
  const translateZValue = boxHeight / 2;



  boxArray.forEach((element)=>{
    const boxSidesArray = element.querySelectorAll(".header_boxSide");

    boxSidesArray.forEach(side=>{
      side.style.height= boxHeight + "px";
    });

    const translateToMiddle = `translateX(-${translateZValue}px) translateY(-${translateZValue}px)`;
    

    // 1 front face
    boxSidesArray[0].style.transform = ` ${translateToMiddle} translateZ(${translateZValue}px) `;
    boxSidesArray[0].style.backgroundColor = "red";

    // 2 back face
    boxSidesArray[1].style.transform = ` ${translateToMiddle} translateZ(-${translateZValue}px) `;
    boxSidesArray[1].style.backgroundColor = "lime";
    // 3 top face
    boxSidesArray[2].style.transform = ` ${translateToMiddle} rotateX(90deg) translateZ(${translateZValue}px) `;
    boxSidesArray[2].style.backgroundColor = "yellow";

    // 4 bottom face
    boxSidesArray[3].style.transform = ` ${translateToMiddle}  rotateX(-90deg) translateZ(${translateZValue}px) `;
    boxSidesArray[3].style.backgroundColor = "cyan";

    // 5 left face
    boxSidesArray[4].style.transform = ` ${translateToMiddle} rotateY(-90deg) translateZ(${translateZValue}px)  `;
    boxSidesArray[4].style.backgroundColor = "hotpink";
    
    // 6 right face
    boxSidesArray[5].style.transform = ` ${translateToMiddle} rotateY(90deg) translateZ(${translateZValue}px) `;
    boxSidesArray[5].style.backgroundColor = "orange";
  });;
  
}


function load_shape(){
  
}

loadBox();

