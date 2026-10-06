const lo_keywords = ["block", "inline"];

function lo_EKW(container) {
  if (!container) return;

  // Wrap keywords in a non-capturing group (?:...) so \b applies to every keyword
  const lo_regExPattern = `\\b(?:${lo_keywords.join("|")})\\b`;
  const lo_regEx = new RegExp(lo_regExPattern, "gi");

  // Collect text nodes across all nesting levels using TreeWalker
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim()) {
      textNodes.push(walker.currentNode);
    }
  }

  // Replace keywords within text nodes
  textNodes.forEach(node => {
    if (lo_regEx.test(node.textContent)) {
      const span = document.createElement("span");

      // Escape HTML entities to prevent plain text symbols (<, >, &) from corrupting the DOM
      const safeText = node.textContent
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      span.innerHTML = safeText.replace(lo_regEx, "<mark>$&</mark>");
      node.replaceWith(...span.childNodes);
    }
  });
}


function lo_createPracticeHTML() {
  const button = document.createElement("button");
  const div = document.createElement("div");

  button.textContent =  "Practice";
  button.style.width =  "100px";
  button.style.marginLeft = "60px";

  button.addEventListener("click", () => {
    const isSelected = button.classList.toggle("selected");

    div.style.display = isSelected ? "flex" : "none";
    div.style.padding = "0 30px"

    button.setAttribute("aria-expanded", String(isSelected));

  });


  div.innerHTML =  `
  <p>
    Shortbread jelly-o sugar plum sweet I love cookie cotton candy shortbread liquorice. Macaroon sesame snaps candy ice cream carrot cake. Marzipan jelly beans apple pie bear claw carrot cake jelly I love. Dragée liquorice carrot cake chocolate jelly-o halvah. Pastry marzipan jelly beans bonbon jelly beans sweet roll. Chocolate ice cream wafer sweet chocolate. Dragée dessert toffee pudding I love lollipop macaroon cupcake.
  </p>
  <p>
    Cake sesame snaps croissant powder cake chocolate bar biscuit ice cream. Gummi bears pastry sweet roll tart toffee apple pie cake. Oat cake ice cream oat cake I love liquorice tiramisu marzipan. Sesame snaps cake caramels cake icing tootsie roll sesame snaps bonbon. Cheesecake pastry bonbon liquorice marshmallow macaroon. Topping muffin sugar plum gummies tootsie roll I love cake I love. Lollipop apple pie marzipan shortbread shortbread candy canes bonbon I love tart. Chocolate bar cake marshmallow marzipan chupa chups tiramisu. Marshmallow brownie oat cake jujubes I love tootsie roll gummi bears cake. Chocolate cake cheesecake dessert ice cream I love.
  </p>
  <p>
    Biscuit cake cotton candy gummi bears caramels cake wafer halvah. Tootsie roll halvah gummi bears I love donut donut toffee. I love brownie marshmallow candy fruitcake jelly. Caramels soufflé jelly-o sweet roll cupcake cake bear claw I love I love. Chocolate lemon drops apple pie carrot cake macaroon cake. Wafer jelly marzipan pie gingerbread. Donut sesame snaps gummies jujubes jujubes shortbread jelly beans I love. Danish tart topping pastry sugar plum tootsie roll chocolate cake.
  </p>
  `;

  div.style.display = "none";
  div.style.flexDirection = "column";
  
    

  lessonOverview.appendChild(button);
  lessonOverview.appendChild(div);

  lo_practiceRegExp(div);
}


function lo_practiceRegExp(target) {
  const regExPattern1 = /\bsugar\b/gi;
  target.innerHTML = target.innerHTML.replace(regExPattern1, `<mark>$&</mark>`);
  
  const regExPattern2 = /\b(candy|plum)\b/gi;
  target.innerHTML = target.innerHTML.replace(regExPattern2, `thicc thighed & $& femboys`);
  
  const regExPattern3 = /\bCake/gim;
  target.innerHTML = target.innerHTML.replace(regExPattern3, `<span style="background-color:pink">phat dumpy</span>`);
  
  const regExPattern4 = /\w*(?=\w*bar\w*)/gi;
  target.innerHTML = target.innerHTML.replace(regExPattern4, `<span style="background-color:teal">Positive Look Ahead</span>`);
  
  const regExPattern5 = /\bc\b/gi;
  target.innerHTML = target.innerHTML.replace(regExPattern5, `a`);

  
}
// Execute function
const lessonOverview = document.getElementById("lesson_overveiw");
lo_EKW(lessonOverview);
lo_createPracticeHTML();


