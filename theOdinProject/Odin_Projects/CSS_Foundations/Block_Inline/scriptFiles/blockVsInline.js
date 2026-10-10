const blockAndInline = {
  rootNode: document.getElementById("blockAndInline"),

  highlightedWords: [
    "display: block",
    "display: inline-block",
    "<a>",
  ],

  highlight() {
    //convert special characters
    const escapedWords = this.highlightedWords.map(word => {
      return words.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });

    const joinedHighlightedWords = escapedWords.join("|");
    const regExpPattern = new RegExp(`\\b${joinedHighlightedWords}\\b` ,"gi");

    const walker = document.createTreeWalker(
      //Root Node
      this.rootNode,

      //What to show
      NodeFilter.SHOW_TEXT,

      //Filter function 
      {
        acceptNode(node) {
          const parentTag = node.parentElement.tagName;

          if(parentTag === "BUTTON" || parentTag === "MARK") {
            return NodeFilter.FILTER_REJECT;
          }

          return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const textNodes = [];
    
    while(walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      if(regExpPattern.test(node.textContent)) {
        const span = document.createElement("span");
        span.innerHTML = node.textContent.replace(regExpPattern, `<mark>$&</mark>`);
        node.replaceWith(...span.childNodes);
      }
    });

  },


};
