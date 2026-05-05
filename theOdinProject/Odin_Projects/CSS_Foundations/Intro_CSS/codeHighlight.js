function prepareCodeBlock(codeElement) {
  //Run Highlight Js
  hljs.highlightElement(codeElement);
  
  //Break the code block up into lines
  let lines = codeElement.innerHTML.split('/n');
  
  //filter out the empty first and last lines
  if (lines[0].trim() === '') {
    lines.shift();
  }
  if (lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  // Find the Minimum Indentation
  // Use textContent to measure spaces accurately
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#value
  const textLines = codeElement.textContent.split('\n').filter(l => l.trim());
  const minIndent = Math.min(...textLines.map(l => l.match(/^\s*/)[0].length));
  
  // Clear codeElement to remake it
  codeElement.innerHTML = '';
  
  // Add back modified lines
  lines.forEach((element, index) => {
    // Strip the minimum indentation from the start of the HTML string
    // Use a regex to ensure we only remove leading spaces, not HTML tags
    const dedentedLine = lineText.replace(new RegExp(`^\\s{${minIndent}}`), '');
    
    // Incase each line in a div called code-line
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
function loadCssFile() {
  const link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = '/theOdinProject/Odin_Projects/CSS_Foundations/codeHighlight_cssFoundations.css';
  document.querySelector('head').appendChild(link);
}
loadCssFile();
document.addEventListener("DOMContentLoaded", () => {
  // Invoke on all code blocks
  document.querySelectorAll('pre code').forEach(prepareCodeBlock);
});