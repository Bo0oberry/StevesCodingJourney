const  sectionList = [...document.querySelectorAll('main > section')];
 let selectedSection =1;

function setVisable(){
    const selMain = sectionList[selectedSection];
    const selLeft = sectionList[5];
    const selRight = sectionList[4];

    // const selLeft = (selectedSection  === 0 )? sectionList[sectionList.length -1] : sectionList[selectedSection  -1];
    // const selRight = (selectedSection  === (sectionList.length -1)) ? sectionList[0] :sectionList[selectedSection  + 1] ;
    
    selMain.classList.add("sectionSelected");
    selLeft.classList.add("sectionSelected");
    selRight.classList.add("sectionSelected");

    selMain.style.gridArea = "large";
    selLeft.style.gridArea = "mediumA";
    selRight.style.gridArea = "mediumB"
}

setVisable();
// sectionList[0].querySelector('h2').innerText = "tererer";
// document.querySelector('h1').innerText = "tyty";