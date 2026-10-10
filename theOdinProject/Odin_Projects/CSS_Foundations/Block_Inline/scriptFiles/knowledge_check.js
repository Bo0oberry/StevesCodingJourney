// find knowledge check
const knowledgeCheck = document.getElementById("knowledge_check");
const knowledgeCheck_detailElements = knowledgeCheck.querySelectorAll("details");
const kc_details = {};

knowledgeCheck_detailElements.forEach((ele,index) => {
  kc_details[`detail${index}`] = {
    target: ele
  };
  
  kc_details[`detail${index}`].summary = ele.querySelector("summary");
  
  // kc_placeTextInP(kc_details[`detail${index}`].summary);
  // kc_makeButton(kc_details[`detail${index}`].summary);
  
  
});

function kc_makeButton(targetEle) {
  const newButton = document.createElement('button');
  targetEle.insertBefore(newButton, targetEle.querySelector('p'));
}

function kc_placeTextInP(targetEle) {
  const newP = document.createElement('p');
  newP.textContent = targetEle.textContent;
  
  targetEle.textContent = "";
  targetEle.appendChild(newP);
}

