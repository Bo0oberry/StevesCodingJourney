//create line counter 
function lineCounter(num) {
  const newSpan = document.createElement('span');
   newSpan.textContent = num;
}

// manipulate code block 
function codeBlock() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach((ele)=>{
    const lines = ele.innerText.split(/\r?\n/);
    const lineAmount = lines.length;
  });
}