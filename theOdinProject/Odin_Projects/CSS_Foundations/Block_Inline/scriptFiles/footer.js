const footer = document.getElementById('footer');
const footer_textField = document.getElementById('foot_textFeild');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function foot_getTextToRegEx() {
  const value = footer_textField.value.trim();
  if (!value) return null;

  const escapedPattern = escapeRegExp(value);
  return new RegExp(escapedPattern, 'gi');
}

function foot_removePreviousHighlights(container = document.body) {
  // Query class matches the wrapped spans below
  const spanArray = container.querySelectorAll('.foot_findWordText');
  spanArray.forEach(spanElement => {
    spanElement.replaceWith(...spanElement.childNodes);
  });
  // Merge fragmented text nodes back into single nodes
  container.normalize();
}

function foot_encaseTextInSpan(regExPattern, container = document.body) {
  if (!regExPattern) return;

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parentTag = node.parentNode.tagName.toLowerCase();
        if (['script', 'style', 'input', 'textarea'].includes(parentTag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    const parent = node.parentNode;
    if (parent.classList?.contains('foot_findWordText')) return;

    const matches = node.nodeValue.match(regExPattern);
    if (matches) {
      const tempWrapper = document.createElement('div');
      tempWrapper.innerHTML = node.nodeValue.replace(
        regExPattern,
        '<span class="foot_findWordText">$&</span>'
      );

      while (tempWrapper.firstChild) {
        parent.insertBefore(tempWrapper.firstChild, node);
      }
      parent.removeChild(node);
    }
  });
}

footer_textField.addEventListener('input', () => {
  const newRegEx = foot_getTextToRegEx();
  foot_removePreviousHighlights();
  foot_encaseTextInSpan(newRegEx);
});