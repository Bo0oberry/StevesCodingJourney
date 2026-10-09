const blockAndInline = {
  rootNode: document.getElementById("blockAndInline"),
  
  highlightedWords: [
    "display: block",
    "display: inline-block",
    "<a>",
  ],
  
  highlight() {
   const walker = document.createTreeWalker(
     //Root Node
     this.rootNode,
     
     //What to show
     NodeFilter.SHOW_TEXT,
     
     //Filter function 
     {
       acceptNode(node) {
         return node.textContent.includes(this.highlightedWords) 
         ? NodeFilter.FILTER_ACCEPT 
         : NodeFilter.FILTER_REJECT;
       }
     }
   );
  },
};
