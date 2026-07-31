const listOfParagraphElememts = document.querySelectorAll('p');
const highlightedWords = [
  "code", "oden", "CSS"
]

function textManipulation(highlightedWords){ 
  const pattern = `\\b(${highlightedWords.join('|')})\\b`;
  listOfParagraphElememts.forEach((pEle)=>{
    
  });
}



textManipulation(highlightedWords);