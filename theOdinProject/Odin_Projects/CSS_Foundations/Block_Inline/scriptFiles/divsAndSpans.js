const divsAndSpans = {
  root: document.getElementById('divsAndSpans'),

  styleFirstParagraph(pEle) {
    pEle.classList.add("p1");

    const button = document.createElement("button");
    button.style.height = "30px";
    button.style.width = "30px";
    pEle.insertAdjacentElement("afterbegin", button);

  },

  styleSection() {
    const paragraphs =  this.root.querySelectorAll("p");
    this.styleFirstParagraph(paragraphs[0]);

  }

};



divsAndSpans.styleSection();

