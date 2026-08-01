const listOfParagraphElememts = document.querySelectorAll('p');
const highlightedWords = [
  "code", "oden", "CSS"
]

function textManipulation(highlightedWords){ 
  const pattern = `\\b(${highlightedWords.join('|')})\\b`;
  const highlightRegEx = new RegExp(pattern, 'gi')
  listOfParagraphElememts.forEach((paragraphEle)=>{
    
  });
}



textManipulation(highlightedWords);