const navLinks = ` 
  <ul>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/001_cssTransitionOptions/index.html">
        Transition Options
      </a>
    </li>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/002_2DTransformBasics/index.html">
        2D Transform Basics
      </a>
    </li>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/003_transformOrigin/index.html">
        Transform Origin
      </a>
    </li>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/004_3DTransforms/index.html">
        3D Transforms
      </a>
    </li>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/005_rotatingButton/index.html">
        Rotating Button
      </a>
    </li>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/006_swipeButton/index.html">
        Swipe Button
      </a>
    </li>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/007_moreButtons/index.html">
        More Buttons 
      </a>
    </li>
  </ul>
`;
document.querySelector("nav").innerHTML = navLinks;
/*  
<li>
  <a href="/UdemyCSS&JavaScriptAnimations//index.html">
    |
  </a>
</li>
*/

const currentLink = window.location.pathname.split("/");
const currentLinkFolderName = currentLink[currentLink.length - 2];
const navLinkList = Array.from(document.querySelectorAll('nav a'));

navLinkList.forEach((element,index) => {
  const href = element.getAttribute("href").split('/');
  const hrefLocation = href[href.length -2];
  
  if(hrefLocation === currentLinkFolderName) {
    element.classList.add("active");
    element.addEventListener('click', 
      function (event) {
        event.preventDefault();
      })
  }
});

//document.querySelector("nav").innerHTML+="<br>"+currentLinkFolderName;



/* Header  create structure*/
const header = document.querySelector('header');
const active = document.querySelector("nav a.active");

const homeLink = document.createElement("a");
homeLink.classList.add("headerHome");
homeLink.href = "/UdemyCSS&JavaScriptAnimations/index.html";

const homeImg = document.createElement('img');
homeImg.src = "/UdemyCSS&JavaScriptAnimations/forrest_ivysaur_firefly.png";
homeImg.setAttribute('width', '300');
homeImg.setAttribute('height', '300');
homeLink.appendChild(homeImg);
header.appendChild(homeLink);


/* Header  add link src */
let activeIndex = "home";
navLinkList.forEach((element,index) => {
  if(element.classList.contains("active")) {
    activeIndex = index;
    return;
  }
}); 

switch(activeIndex) {
  case 'home':
    header.appendChild(createDiv('headerPrevEmpty'));
    header.appendChild(createAnchor(navLinkList[0],'headerNext'));
    break;
  case 0:
    const toHome = document.createElement('a');
    toHome.setAttribute('href', "/UdemyCSS&JavaScriptAnimations/index.html");
    toHome.innerHTML = 'Home';
    toHome.classList.add('headerPrev');
    header.appendChild(toHome);
    header.appendChild(createAnchor(navLinkList[activeIndex +1],'headerNext'));
    break;
  case (navLinkList.length - 1):
    header.appendChild(createAnchor(navLinkList[activeIndex -1],'headerPrev'));
    header.appendChild(createDiv('headerNextEmpty'));
    break;
  default:
    header.appendChild(createAnchor(navLinkList[activeIndex -1],'headerPrev'));
    header.appendChild(createAnchor(navLinkList[activeIndex +1],'headerNext'));
    break;
   
}

function createDiv(className) {
  const empty = document.createElement('div');
  empty.classList.add(className);
  return empty;
}

function createAnchor(element,className) {
  const newEle = element.cloneNode(true);
  newEle.classList.add(className);
  switch(className) {
    case "headerPrev":
      newEle.innerHTML = "prev";
      break;
    case "headerNext":
      newEle.innerHTML = "next";
      break;
    }
  return newEle;
}


