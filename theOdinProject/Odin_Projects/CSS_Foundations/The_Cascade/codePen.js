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

    lines.forEach((ele)=>{
      const newSpan = document.createElement('span');
      newSpan.innerHTML = `<span class='lineNum'>${lines.indexOf(ele) + 1}</span>`;
      newSpan.textContent += ele;
      ele.parentElement.appendChild(newSpan);
    });
  });
}