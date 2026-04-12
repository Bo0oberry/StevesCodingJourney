function prepareCodeBlock(codeElement) {
    // 1. Run Highlight.js
    hljs.highlightElement(codeElement);
    
    // 2. Get lines and filter out the empty first/last lines from HTML formatting
    let lines = codeElement.innerHTML.split('\n');
    if (lines[0].trim() === '') lines.shift();
    if (lines[lines.length - 1].trim() === '') lines.pop();

    // 3. Find the Minimum Indentation (The Dedent Ritual)
    // We use textContent to measure spaces accurately
    const textLines = codeElement.textContent.split('\n').filter(l => l.trim());
    const minIndent = Math.min(...textLines.map(l => l.match(/^\s*/)[0].length));

    codeElement.innerHTML = ''; // Clear for rebuild

    lines.forEach((lineText, index) => {
        const row = document.createElement('div');
        row.className = 'code-line';
        
        // 4. Strip the minimum indentation from the start of the HTML string
        // We use a regex to ensure we only remove leading spaces, not HTML tags
        const dedentedLine = lineText.replace(new RegExp(`^\\s{${minIndent}}`), '');

        row.innerHTML = `
            <span class="line-number">${index + 1}</span>
            <span class="line-content">${dedentedLine}</span>
        `;
        
        codeElement.appendChild(row);
    });
}

// Invoke on all code blocks
document.querySelectorAll('pre code').forEach(prepareCodeBlock);
