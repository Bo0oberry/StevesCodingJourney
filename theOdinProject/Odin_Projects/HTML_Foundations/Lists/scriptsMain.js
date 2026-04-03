const  sectionList = [...document.querySelectorAll('main > section')];
let selectedSection = 0;

function setVisable(direction){

    switch (direction) {
        case "main":
            return;
        case "left":
            (selectedSection === 0) ? selectedSection = sectionList.length -1 : selectedSection -= 1;
            break;
        case "right":
            (selectedSection ===  sectionList.length -1 ) ? selectedSection = 0 : selectedSection += 1;
            break;
        default: 
            selectedSection = 0;
    }

    const list = getSelected();

    setSectionState(list);
    makeSidesButtons(list)
}

function getSelected(direction){
    const selMain = sectionList[selectedSection];
    const selLeft = (selectedSection  === 0 )? sectionList[sectionList.length -1] : sectionList[selectedSection  -1];
    const selRight = (selectedSection  === (sectionList.length -1)) ? sectionList[0] :sectionList[selectedSection  + 1] ;

    return [selMain, selLeft, selRight];
}

function setSectionState(list){
     // 1. Clean up: Remove the class and reset gridArea for ALL sections
    sectionList.forEach(sec => {
        sec.classList.remove("sectionSelected");
        sec.classList.remove("sectionSide");
        sec.style.gridArea = ""; 
    });

    // 2. Apply states specifically to the current selection
    // list[0] = Main, list[1] = Left, list[2] = Right
    list[0].classList.add("sectionSelected");
    list[1].classList.add("sectionSelected");
    list[2].classList.add("sectionSelected");

    list[0].style.gridArea = "middle";
    list[1].style.gridArea = "left";
    list[2].style.gridArea = "right";

    list[1].classList.add("sectionSide");
    list[2].classList.add("sectionSide");
}

function makeSidesButtons(list){
    
    list[0].onclick = () => setVisable("main");
    list[1].onclick = () => setVisable("left");
    list[2].onclick = () => setVisable("right");
}

setVisable();
