// find knowledge check
const knowledgeCheck = document.getElementById("knowledge_check");
knowledgeCheck.querySelector("h2").style.backgroundColor = "white";
const knowledgeCheck_detailElements =  knowledgeCheck.querySelectorAll("details");
knowledgeCheck_detailElements.forEach(ele => {ele.style.backgroundColor = "green"});



