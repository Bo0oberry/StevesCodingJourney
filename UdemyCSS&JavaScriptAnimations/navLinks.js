const navLinks = ` 
  <ul>
    <li>
      <a href="/UdemyCSS&JavaScriptAnimations/index.html">
        Home
      </a>
    </li>
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

const navLinkList = document.querySelectorAll('nav ul a');

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

document.querySelector("nav").innerHTML += "<br>"+currentLinkFolderName;


/*.Header */
const header = document.querySelector('header');

