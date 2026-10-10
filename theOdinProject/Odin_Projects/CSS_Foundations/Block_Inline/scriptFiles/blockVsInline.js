const blockAndInline = {
  rootNode: document.getElementById("blockAndInline"),

  highlightedWords: [
    "display: block",
    "display: inline-block",
    "<a>",
  ],

  highlight() {
    const joinedHighlightedWords = this.highlightedWords.join("|");
    const regExpPattern = new RegExp(`\\b${joinedHighlightedWords}\                             \b` ,"gi");



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

          return node.textContent.includes(regExpPattern)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );
  },
};
