//load css Files
const head = document.head

const scriptLinks = [
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/introduction.js",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/lesson_overveiw.js",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/blockVsInline.js",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/divsAndSpans.js",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/knowledge_check.js",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/assignment.js",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/scriptFiles/footer.js"
];

const cssLinks = [
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/introduction.css",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/lesson_overveiw.css",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/blockVsInline.css",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/divsAndSpans.css",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/knowledge _check.css",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/assignment.css",
  "/theOdinProject/Odin_Projects/CSS_Foundations/Block_Inline/cssFiles/footer.css"
];

function createCssLinkElement(linkAddress) {
  const newLink = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.type = "text/css";
  newLink.href = linkAddress;
  
  head.appendChild(newLink);
}

function createScriptElement(scriptAdress) {
  const newScript = document.createElement("script");
  newScript.src = scriptAdress;
  newScript.defer = true;
  
  head.appendChild(newScript);
}

cssLinks.forEach(createCssLinkElement);
scriptLinks.forEach(createScriptElement);

