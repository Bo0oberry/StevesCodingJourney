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
        }
      }
    );

    const textNodes = [];
    let currentNode;
    while ()
  }
}