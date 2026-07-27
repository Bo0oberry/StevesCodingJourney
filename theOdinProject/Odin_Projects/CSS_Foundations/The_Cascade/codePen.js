function codeBlock() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeElement) => {
    const lines = codeElement.innerText.split(/\r?\n/);
    
    // Clear original content
    codeElement.innerHTML = '';

    // 1. Remove excess indent
    removeExcessWhitespace(lines);

    // 2. Escape raw HTML entities first so code isn't rendered as live DOM elements
    escapeLines(lines);

    // 3. Highlight keywords
    keywords(lines);

    // 4. Build DOM elements
    createDomElements(lines, codeElement);
  });
}

// FUNCTION - escape HTML characters
function escapeLines(codeBlockLines) {
  codeBlockLines.forEach((line, index) => {
    codeBlockLines[index] = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  });
}

// FUNCTION - remove excess whitespace
function removeExcessWhitespace(codeBlockLines) {
  const indentMatch = codeBlockLines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^\s*/)[0].length);
  
  const minIndent = indentMatch.length ? Math.min(...indentMatch) : 0;

  codeBlockLines.forEach((line, index) => {
    codeBlockLines[index] = line.slice(minIndent);
  });
}

// FUNCTION - find keywords and wrap in identifying span class
function keywords(codeBlockLines) {
  const tagKeywords = ["div", "span", "pre", "code"];
  const attributeKeywords = ["class", "id", "src", "href"];

  // Matches &lt; or &lt;/ followed by tag keyword
  const tagRegex = new RegExp(`(&lt;|&lt;/)(${tagKeywords.join('|')})\\b`, 'gi');
  
  // Matches full escaped tag block: &lt; ... &gt;
  const fullTagRegex = /&lt;[^&]*?&gt;/gi;
  
  // Matches attribute names followed by =
  const attrRegex = new RegExp(`\\b(${attributeKeywords.join('|')})\\b(?=\\s*=)`, 'gi');

  codeBlockLines.forEach((lineText, index) => {
    let highlightedLine = lineText;

    // Step A: Highlight tag names
    highlightedLine = highlightedLine.replace(tagRegex, '$1<span class="tag-keyword">$2</span>');

    // Step B: Highlight attributes ONLY inside tag boundaries
    highlightedLine = highlightedLine.replace(fullTagRegex, (fullTagMatch) => {
      return fullTagMatch.replace(attrRegex, '<span class="attr-keyword">$1</span>');
    });

    codeBlockLines[index] = highlightedLine;
  });
}

// FUNCTION - build DOM elements
function createDomElements(lines, codeEl) {
  lines.forEach((lineText, index) => {
    const lineSpan = document.createElement('div');
    lineSpan.classList.add('code-line');

    const numSpan = document.createElement('span');
    numSpan.className = 'code-IndexNum';
    numSpan.textContent = index + 1;

    const contentSpan = document.createElement('span');
    contentSpan.className = 'code-content';
    // Fallback to &nbsp; if line is completely empty so line height is preserved
    contentSpan.innerHTML = lineText || '&nbsp;';

    lineSpan.appendChild(numSpan);
    lineSpan.appendChild(contentSpan);

    codeEl.appendChild(lineSpan);
  });
}

codeBlock();