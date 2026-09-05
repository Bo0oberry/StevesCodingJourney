function loadBox() {
  const boxArray = document.querySelectorAll(".header_boxMain");
  const headerHeight = document.querySelector("header").offsetHeight;
  const boxHeight = headerHeight * 0.8;
  const translateZValue = boxHeight / 2 + "px";

  

  boxArray.forEach((element)=>{
    const boxSidesArray = element.querySelectorAll(".header_boxSide");

    boxSidesArray.forEach(side=>{
      side.style.height= boxHeight + "px";
    });

    //1 front face
    boxSidesArray[0].style.transform = `translateZ(${translateZValue})`;
    // 2 back face
    boxSidesArray[1].style.transform = `translateZ(-${translateZValue})`;
    // 3 top face
    boxSidesArray[2].style.transform = `rotateX(90deg) translateZ(${translateZValue})`;
    // 4 bottom face
    boxSidesArray[3].style.transform = `rotateX(-90deg) translateZ(${translateZValue})`;
    // 5 left face
    boxSidesArray[4].style.transform = `rotateY(-90deg) translateZ(${translateZValue}`;
    // 6 right face
    boxSidesArray[5].style.transform = `rotateY(90deg) translateZ(${translateZValue})`;
  });
}

loadBox();