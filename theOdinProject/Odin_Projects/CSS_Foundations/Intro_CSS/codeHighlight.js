function prepareCodeBlock(codeElement) {
  // 1. Get raw text to calculate minimum indentation before highlighting
  const textLines = codeElement.textContent.split('\n').filter(l => l.trim().length > 0);
  const minIndent = textLines.length > 0 
    ? Math.min(...textLines.map(l => l.match(/^\s*/)[0].length)) 
    : 0;

  // 2. Run Highlight.js
  hljs.highlightElement(codeElement);
  
  // 3. Break the highlighted HTML into lines
  let lines = codeElement.innerHTML.split('\n');
  
  // 4. Filter out empty first/last lines
  if (lines.length > 0 && lines[0].trim() === '') lines.shift();
  if (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
  
  // 5. Clear codeElement to rebuild the DOM
  codeElement.innerHTML = '';
  
  // 6. Add back modified lines
  lines.forEach((lineContent, index) => {
    // Strip the minimum indentation
    const dedentedLine = lineContent.replace(new RegExp(`^\\s{${minIndent}}`), '');
    
    const row = document.createElement('div');
    row.classList.add("code-line");
    row.innerHTML = `
        <span class="line-number">${index + 1}</span>
        <span class="line-content">${dedentedLine}</span>
    `;
    
    codeElement.appendChild(row);
  });
}
//Load CSS for code block
function loadCssFileB() {
  const link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = '/theOdinProject/Odin_Projects/CSS_Foundations/codeHighlight_cssFoundations.css';
  document.head.appendChild(link);
}
loadCssFileB();

// Invoke on all code blocks
document.querySelectorAll('pre code').forEach(prepareCodeBlock);