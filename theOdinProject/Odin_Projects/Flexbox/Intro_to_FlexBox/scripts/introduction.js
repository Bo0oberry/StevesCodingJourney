const introduction = {
  italisized: ["revolutionary"],

  wrapWords() {
    const walker = document.createTreeWalker(document.querySelector('#introduction'), NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parentTag = node.parentElement?.tagName;
          if (parentTag === "P" || parentTag === "DIV") {
            return NodeFilter.FILTER_ACCEPT
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    const textNodes = [];
    let currentNode;
    while (currentNode = walker.nextNode()) {
      textNodes.push(currentNode);
    }
    
    const regExpPattern = /revolutionary/gi;
    
   for (const textNode of textNodes ) {
     textNode.innerHTML = textNode.innerHTML.replace(regExpPattern, `<em>$&</em`)
   }
  },
  
  initialize(){
    if(!document.querySelector("#introduction")) return;
    
    this.wrapWords();
  }
}

introduction.initialize();