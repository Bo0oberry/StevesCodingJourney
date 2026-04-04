/*  Code Block */
const arrayOfCodeBlocks = document.querySelectorAll('section code');

// Pass the function name directly to forEach
arrayOfCodeBlocks.forEach(scanCode);

function scanCode(codeBlock) {
    // 1. Get the content of the specific block being scanned
    let content = codeBlock.innerHTML;

    // 2. Perform the replacement
    // This wraps the brackets and the tag content separately
    content = content.replace(/(&lt;\/?)([\s\S]*?)(&gt;)/g, 
        '<span class="bracket">$1</span><span class="tag">$2</span><span class="bracket">$3</span>'
    );

    // 3. Update the specific block
    codeBlock.innerHTML = content;
}